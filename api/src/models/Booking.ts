import { Schema, model } from 'mongoose'
import * as env from '../config/env.config'

const bookingSchema = new Schema<env.Booking>(
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
        env.BookingStatus.Void,
        env.BookingStatus.Pending,
        env.BookingStatus.Deposit,
        env.BookingStatus.Paid,
        env.BookingStatus.Reserved,
        env.BookingStatus.Cancelled
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

Booking.on('index', (err) => {
  if (err) {
    console.error('Booking index error: %s', err)
  } else {
    console.info('Booking indexing complete')
  }
})

export default Booking
