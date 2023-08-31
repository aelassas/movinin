import { Schema, model, Types } from 'mongoose'

interface Location {
  values: Types.ObjectId[]
}

const locationSchema = new Schema<Location>(
  {
    values: {
      type: [Schema.Types.ObjectId],
      ref: 'LocationValue',
      validate: (value: string): boolean => Array.isArray(value) && value.length > 1,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'Location',
  },
)

const Location = model<Location>('Location', locationSchema)

Location.on('index', (err) => {
  if (err) {
    console.error('Location index error: %s', err)
  } else {
    console.info('Location indexing complete')
  }
})

export default Location
