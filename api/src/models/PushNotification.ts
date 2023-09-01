import { Schema, model } from 'mongoose'
import * as Env from '../config/env.config'

const pushNotificationSchema = new Schema<Env.PushNotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
      index: true,
    },
    token: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'PushNotification',
  },
)

const PushNotification = model<Env.PushNotification>('PushNotification', pushNotificationSchema)

PushNotification.on('index', (err) => {
  if (err) {
    console.error('PushNotification index error: %s', err)
  } else {
    console.info('PushNotification indexing complete')
  }
})

export default PushNotification
