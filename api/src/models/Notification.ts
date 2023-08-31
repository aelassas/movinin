import { Schema, model, Types } from 'mongoose'

interface Notification {
  user: Types.ObjectId
  message: string
  booking: Types.ObjectId
  isRead?: boolean
}

const notificationSchema = new Schema<Notification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
      index: true,
    },
    message: {
      type: String,
      required: [true, "can't be blank"],
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'Notification',
  },
)

const Notification = model<Notification>('Notification', notificationSchema)

Notification.on('index', (err) => {
  if (err) {
    console.error('Notification index error: %s', err)
  } else {
    console.info('Notification indexing complete')
  }
})

export default Notification
