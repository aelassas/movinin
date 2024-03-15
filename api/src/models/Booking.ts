import { Schema, model } from 'mongoose'
import * as movininTypes from 'movinin-types'
import * as env from '../config/env.config'

const bookingSchema = new Schema<env.Booking>(
  {
    agency: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
    },
    location: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'Location',
    },
    property: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'Property',
    },
    renter: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
    },
    from: {
      type: Date,
      required: [true, "can't be blank"],
    },
    to: {
      type: Date,
      required: [true, "can't be blank"],
    },
    status: {
      type: String,
      enum: [
        movininTypes.BookingStatus.Void,
        movininTypes.BookingStatus.Pending,
        movininTypes.BookingStatus.Deposit,
        movininTypes.BookingStatus.Paid,
        movininTypes.BookingStatus.Reserved,
        movininTypes.BookingStatus.Cancelled,
      ],
      required: [true, "can't be blank"],
    },
    cancellation: {
      type: Boolean,
      default: false,
    },
    cancelRequest: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'Booking',
  },
)

const Booking = model<env.Booking>('Booking', bookingSchema)

export default Booking
