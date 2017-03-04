// @flow

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import koaRouter from 'koa-router'

import { particle } from './config'
import DeviceInterface from './lib/DeviceInterface'
import deviceWatcher from './lib/deviceWatcher'
import routes from './routes'

type TDataStore = {|
  deviceThresholds: Object,
  deviceAlarms: Object,
  users: Object,
  contacts: Object,
|}
let dataStore: TDataStore = {
  deviceThresholds: {},   // key = deviceId
  deviceAlarms: {},       // key = deviceId
  users: {},              // key = userId
  contacts: {},           // key = userId
}

let port = process.env.PORT || 3002
let router = koaRouter()
let app = new Koa()

let deviceInterface = new DeviceInterface()
deviceInterface.login(particle.username, particle.password)

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
