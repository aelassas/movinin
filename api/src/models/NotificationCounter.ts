import { Schema, model, Types } from 'mongoose'

interface NotificationCounter {
  user: Types.ObjectId
  count?: number
}

const notificationCounterSchema = new Schema<NotificationCounter>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      unique: true,
      ref: 'User',
    },
    count: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'NotificationCounter',
  },
)

const NotificationCounter = model<NotificationCounter>('NotificationCounter', notificationCounterSchema)

NotificationCounter.on('index', (err) => {
  if (err) {
    console.error('NotificationCounter index error: %s', err)
  } else {
    console.info('NotificationCounter indexing complete')
  }
})

export default NotificationCounter
