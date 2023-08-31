import process from 'node:process'
import { Schema, model, Types } from 'mongoose'

const EXPIRE_AT = Number.parseInt(String(process.env.MI_TOKEN_EXPIRE_AT), 10)

interface Token {
  user: Types.ObjectId
  token: string
  expireAt?: Date
}

const tokenSchema = new Schema<Token>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
    },
    token: {
      type: String,
      required: [true, "can't be blank"],
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: EXPIRE_AT },
    },
  },
  {
    strict: true,
    collection: 'Token',
  },
)

const Token = model<Token>('Token', tokenSchema)

Token.on('index', (err) => {
  if (err) {
    console.error('Token index error: %s', err)
  } else {
    console.info('Token indexing complete')
  }
})

export default Token
