import 'dotenv/config'
import fs from 'node:fs/promises'
import https from 'node:https'
import process from 'node:process'
import app from './server'
import * as Helper from './common/helper'

const PORT = Number.parseInt(String(process.env.MI_PORT), 10) || 4003
const HTTPS = Helper.StringToBoolean(String(process.env.MI_HTTPS))
const PRIVATE_KEY = String(process.env.MI_PRIVATE_KEY)
const CERTIFICATE = String(process.env.MI_CERTIFICATE)

if (HTTPS) {
    https.globalAgent.maxSockets = Number.POSITIVE_INFINITY
    const privateKey = await fs.readFile(PRIVATE_KEY, 'utf8')
    const certificate = await fs.readFile(CERTIFICATE, 'utf8')
    const credentials = { key: privateKey, cert: certificate }
    const httpsServer = https.createServer(credentials, app)

    httpsServer.listen(PORT, () => {
        console.log('HTTPS server is running on Port', PORT)
    })
} else {
    app.listen(PORT, () => {
        console.log('HTTP server is running on Port', PORT)
    })
}
