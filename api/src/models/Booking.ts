import { Schema, model } from 'mongoose'
import * as Env from '../config/env.config'

const bookingSchema = new Schema<Env.Booking>(
  {
    agency: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
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
        Env.BookingStatus.Void,
        Env.BookingStatus.Pending,
        Env.BookingStatus.Deposit,
        Env.BookingStatus.Paid,
        Env.BookingStatus.Reserved,
        Env.BookingStatus.Cancelled
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

const Booking = model<Env.Booking>('Booking', bookingSchema)

Booking.on('index', (err) => {
  if (err) {
    console.error('Booking index error: %s', err)
  } else {
    console.info('Booking indexing complete')
  }
})

export default Booking
