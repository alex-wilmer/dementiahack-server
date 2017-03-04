// @flow

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import koaRouter from 'koa-router'
import firebaseAdmin from 'firebase-admin'

import { particle as particleConfig, firebase as firebaseConfig } from './config'
import DeviceInterface from './lib/DeviceInterface'
import deviceWatcher from './lib/deviceWatcher'
import routes from './routes'

type TDataStore = {|
  devices: Object,
  deviceAlarms: Object,
  users: Object,
  contacts: Object,
|}
let dataStore: TDataStore = {
  devices: {},            // key = deviceId
  deviceAlarms: {},       // key = deviceId
  users: {},              // key = userId
  contacts: {},           // key = userId
}

let port = process.env.PORT || 3002
let router = koaRouter()
let app = new Koa()

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: `https://dementiahack-99509.firebaseio.com`,
})

let deviceInterface = new DeviceInterface()
deviceInterface.login(particleConfig.username, particleConfig.password)

setInterval(() => {
  deviceWatcher({ dataStore, deviceInterface })
}, 3000)

routes.forEach(route => {
  route({ router, dataStore, deviceInterface })
})

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
