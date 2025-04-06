import { Schema, model } from 'mongoose'
import * as env from '../config/env.config'
import * as logger from '../common/logger'

const countrySchema = new Schema<env.Country>(
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
    collection: 'Country',
  },
)

countrySchema.index({ values: 1 })

const Country = model<env.Country>('Country', countrySchema)

Country.syncIndexes().catch((err) => {
  logger.error('Error creating Country indexes:', err)
})

export default Country
