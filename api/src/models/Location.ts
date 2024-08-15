import { Schema, model } from 'mongoose'
import * as env from '../config/env.config'

const locationSchema = new Schema<env.Location>(
  {
    values: {
      type: [Schema.Types.ObjectId],
      ref: 'LocationValue',
      required: [true, "can't be blank"],
      validate: (value: any): boolean => Array.isArray(value),
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'Location',
  },
)

const Location = model<env.Location>('Location', locationSchema)

export default Location
