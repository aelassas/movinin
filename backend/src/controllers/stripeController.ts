import { Request, Response } from 'express'
import Stripe from 'stripe'
import i18n from '../lang/i18n'
import * as logger from '../common/logger'
import * as movininTypes from ':movinin-types'
import * as env from '../config/env.config'
import * as helper from '../common/helper'
import Booking from '../models/Booking'
import User from '../models/User'
import Property from '../models/Property'
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
  try {
    const stripeAPI = (await import('../payment/stripe.js')).default
    const {
      amount,
      currency,
      locale,
      receiptEmail,
      name,
      description,
      customerName,
    }: movininTypes.CreatePaymentPayload = req.body

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
    res.json(result)
  } catch (err) {
    logger.error(`[stripe.createCheckoutSession] ${i18n.t('ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    const stripeAPI = (await import('../payment/stripe.js')).default
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
      res.status(204).send(msg)
      return
    }

    const booking = await Booking.findOne({ sessionId, expireAt: { $ne: null } })
    if (!booking) {
      const msg = `Booking with sessionId ${sessionId} not found`
      logger.info(`[stripe.checkCheckoutSession] ${msg}`)
      res.status(204).send(msg)
      return
    }

    //
    // 2. Update Booking if the payment succeeded
    // (Set BookingStatus to Paid and remove expireAt TTL index)
    //
    if (session.payment_status === 'paid') {
      booking.expireAt = undefined
      booking.status = movininTypes.BookingStatus.Paid
      await booking.save()

      const property = await Property.findById(booking.property)
      if (!property) {
        throw new Error(`Property ${booking.property} not found`)
      }

      // Mark property as unavailable
      // if (env.MARK_PROPERTY_AS_UNAVAILABLE_ON_CHECKOUT) {
      //   await Property.updateOne({ _id: booking.property }, { available: false })
      // }

      const agency = await User.findById(booking.agency)
      if (!agency) {
        throw new Error(`Supplier ${booking.agency} not found`)
      }

      // Send confirmation email to customer
      const user = await User.findById(booking.renter)
      if (!user) {
        throw new Error(`Driver ${booking.renter} not found`)
      }

      user.expireAt = undefined
      await user.save()

      // Notify renter
      if (!(await bookingController.confirm(user, booking, false))) {
        res.sendStatus(400)
        return
      }

      // Notify agency
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

      res.sendStatus(200)
      return
    }

    //
    // 3. Delete Booking if the payment didn't succeed
    //
    await booking.deleteOne()
    res.status(400).send(session.payment_status)
  } catch (err) {
    logger.error(`[stripe.checkCheckoutSession] ${i18n.t('ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
  try {
    const stripeAPI = (await import('../payment/stripe.js')).default
    const {
      amount,
      currency,
      receiptEmail,
      description,
      customerName,
    }: movininTypes.CreatePaymentPayload = req.body

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
    res.status(200).json(result)
  } catch (err) {
    logger.error(`[stripe.createPaymentIntent] ${i18n.t('ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}
