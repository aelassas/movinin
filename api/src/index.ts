import 'dotenv/config'
import process from 'node:process'
import fs from 'node:fs/promises'
import http from 'node:http'
import https from 'node:https'
import mongoose from 'mongoose'
import app from './server'
import * as Helper from './common/helper'

const PORT: number = Number.parseInt(String(process.env.MI_PORT), 10) || 4003
const HTTPS: boolean = Helper.StringToBoolean(String(process.env.MI_HTTPS))
const PRIVATE_KEY: string = String(process.env.MI_PRIVATE_KEY)
const CERTIFICATE: string = String(process.env.MI_CERTIFICATE)

let server: http.Server | https.Server
if (HTTPS) {
    https.globalAgent.maxSockets = Number.POSITIVE_INFINITY
    const privateKey = await fs.readFile(PRIVATE_KEY, 'utf8')
    const certificate = await fs.readFile(CERTIFICATE, 'utf8')
    const credentials = { key: privateKey, cert: certificate }
    server = https.createServer(credentials, app)

    server.listen(PORT, () => {
        console.log('HTTPS server is running on Port', PORT)
    })
} else {
    server = app.listen(PORT, () => {
        console.log('HTTP server is running on Port', PORT)
    })
}

const close = () => {
    console.log('\nGracefully shutting down')
    server.close(async () => {
        console.log(`HTTP${HTTPS ? 'S' : ''} server closed`)
        await mongoose.connection.close(true)
        console.log('MongoDB connection closed')
        process.exit(0)
    })
}

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) => process.on(signal, close))
