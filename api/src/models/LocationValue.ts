import { Schema, model } from 'mongoose'

interface LocationValue {
  language: string
  value: string
}

const locationValueSchema = new Schema<LocationValue>(
  {
    language: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
      lowercase: true,
      minLength: 2,
      maxLength: 2,
    },
    value: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'LocationValue',
  },
)

const LocationValue = model<LocationValue>('LocationValue', locationValueSchema)

LocationValue.on('index', (err) => {
  if (err) {
    console.error('LocationValue index error: %s', err)
  } else {
    console.info('LocationValue indexing complete')
  }
})

export default LocationValue
