import process from 'node:process'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import compression from 'compression'
import helmet from 'helmet'
import nocache from 'nocache'
import strings from './config/app.config'
import * as Helper from './common/helper'

const DB_URI = String(process.env.MI_DB_URI)
const DB_SSL = Helper.StringToBoolean(String(process.env.MI_DB_SSL))
const DB_SSL_CERT = String(process.env.MI_DB_SSL_CERT)
const DB_SSL_CA = String(process.env.MI_DB_SSL_CA)
const DB_DEBUG = Helper.StringToBoolean(String(process.env.MI_DB_DEBUG))
const DEFAULT_LANGUAGE = String(process.env.MI_DEFAULT_LANGUAGE)

let options = {}
if (DB_SSL) {
    options = {
        ssl: true,
        tlsCertificateKeyFile: DB_SSL_CERT,
        tlsCAFile: [DB_SSL_CA],
    }
}

mongoose.set('debug', DB_DEBUG)
mongoose.Promise = globalThis.Promise
try {
    await mongoose.connect(DB_URI, options)
    console.log('Database is connected')
} catch (err) {
    console.error('Cannot connect to the database:', err)
}

const app = express()
app.use(helmet.contentSecurityPolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.crossOriginEmbedderPolicy())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
app.use(helmet.originAgentCluster())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(helmet.crossOriginOpenerPolicy())
app.use(nocache())
app.use(compression({ threshold: 0 }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors())
// app.use('/', userRoutes)

strings.setLanguage(DEFAULT_LANGUAGE)
export default app
