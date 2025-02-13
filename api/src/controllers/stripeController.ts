import { Request, Response } from 'express'
import Stripe from 'stripe'
import stripeAPI from '../stripe'
import i18n from '../lang/i18n'
import * as logger from '../common/logger'
import * as movininTypes from ':movinin-types'
import * as env from '../config/env.config'
import * as helper from '../common/helper'
import Booking from '../models/Booking'
import User from '../models/User'
// import Property from '../models/Property'
import * as bookingController from './bookingController'

/**
 * Create Checkout Session.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createCheckoutSession = async (req: Request, res: Response) => {
  const {
    amount,
    currency,
    locale,
    receiptEmail,
    name,
    description,
    customerName,
  }: movininTypes.CreatePaymentPayload = req.body

  try {
    //
    // 1. Create the customer if he does not already exist
    //
    const customers = await stripeAPI.customers.list({ email: receiptEmail })

    let customer: Stripe.Customer
    if (customers.data.length === 0) {
      customer = await stripeAPI.customers.create({
        email: receiptEmail,
        name: customerName,
      })
    } else {
      [customer] = customers.data
    }

    //
    // 2. Create checkout session
    //
    const expireAt = Math.floor((Date.now() / 1000) + env.STRIPE_SESSION_EXPIRE_AT)

    const session = await stripeAPI.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            product_data: {
              name,
            },
            unit_amount: Math.floor(amount * 100),
            currency: currency.toLowerCase(),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${helper.trimEnd(env.FRONTEND_HOST, '/')}/checkout-session/{CHECKOUT_SESSION_ID}`,
      customer: customer.id,
      locale: helper.getStripeLocale(locale),
      payment_intent_data: {
        description,
      },
      expires_at: expireAt,
    })

    const result: movininTypes.PaymentResult = {
      sessionId: session.id,
      customerId: customer.id,
      clientSecret: session.client_secret,
    }
    return res.json(result)
  } catch (err) {
    logger.error(`[stripe.createCheckoutSession] ${i18n.t('ERROR')}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Check Checkout Session and update booking if the payment succeeded.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params

    //
    // 1. Retrieve Checkout Sesssion and Booking
    //
    let session: Stripe.Checkout.Session | undefined
    try {
      session = await stripeAPI.checkout.sessions.retrieve(sessionId)
    } catch (err) {
      logger.error(`[stripe.checkCheckoutSession] retrieve session error: ${sessionId}`, err)
    }

    if (!session) {
      const msg = `Session ${sessionId} not found`
      logger.info(`[stripe.checkCheckoutSession] ${msg}`)
      return res.status(204).send(msg)
    }

    const booking = await Booking.findOne({ sessionId, expireAt: { $ne: null } })
    if (!booking) {
      const msg = `Booking with sessionId ${sessionId} not found`
      logger.info(`[stripe.checkCheckoutSession] ${msg}`)
      return res.status(204).send(msg)
    }

    //
    // 2. Update Booking if the payment succeeded
    // (Set BookingStatus to Paid and remove expireAt TTL index)
    //
    if (session.payment_status === 'paid') {
      booking.expireAt = undefined
      booking.status = movininTypes.BookingStatus.Paid
      await booking.save()

      // Mark property as unavailable
      // await Property.updateOne({ _id: booking.property }, { available: false })

      // Send confirmation email
      const user = await User.findById(booking.renter)
      if (!user) {
        logger.info(`Renter ${booking.renter} not found`)
        return res.sendStatus(204)
      }

      user.expireAt = undefined
      await user.save()

      if (!await bookingController.confirm(user, booking, false)) {
        return res.sendStatus(400)
      }

      // Notify agency
      const agency = await User.findById(booking.agency)
      if (!agency) {
        logger.info(`Agency ${booking.agency} not found`)
        return res.sendStatus(204)
      }
      i18n.locale = agency.language
      let message = i18n.t('BOOKING_PAID_NOTIFICATION')
      await bookingController.notify(user, booking.id, agency, message)

      // Notify admin
      const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: movininTypes.UserType.Admin }))
      if (admin) {
        i18n.locale = admin.language
        message = i18n.t('BOOKING_PAID_NOTIFICATION')
        await bookingController.notify(user, booking.id, admin, message)
      }

      return res.sendStatus(200)
    }

    //
    // 3. Delete Booking if the payment didn't succeed
    //
    await booking.deleteOne()
    return res.status(400).send(session.payment_status)
  } catch (err) {
    logger.error(`[stripe.checkCheckoutSession] ${i18n.t('ERROR')}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Create Payment Intent.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createPaymentIntent = async (req: Request, res: Response) => {
  const {
    amount,
    currency,
    receiptEmail,
    description,
    customerName,
  }: movininTypes.CreatePaymentPayload = req.body

  try {
    //
    // 1. Create the customer if he does not already exist
    //
    const customers = await stripeAPI.customers.list({ email: receiptEmail })

    let customer: Stripe.Customer
    if (customers.data.length === 0) {
      customer = await stripeAPI.customers.create({
        email: receiptEmail,
        name: customerName,
      })
    } else {
      [customer] = customers.data
    }

    //
    // 2. Create payment intent
    //
    const paymentIntent = await stripeAPI.paymentIntents.create({
      //
      // All API requests expect amounts to be provided in a currency’s smallest unit.
      // For example, to charge 10 USD, provide an amount value of 1000 (that is, 1000 cents).
      //
      amount: Math.floor(amount * 100),
      currency: currency.toLowerCase(),
      receipt_email: receiptEmail,
      description,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    })

    //
    // 3. Send result
    //
    const result: movininTypes.PaymentResult = {
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
      clientSecret: paymentIntent.client_secret,
    }
    return res.status(200).json(result)
  } catch (err) {
    logger.error(`[stripe.createPaymentIntent] ${i18n.t('ERROR')}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}
