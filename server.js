import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import koaRouter from 'koa-router'

import { particle } from './config'
import DeviceInterface from './DeviceInterface'
import routes from './routes'

let deviceInterface = new DeviceInterface()
deviceInterface.login(particle.username, particle.password)
setInterval(() => {
  deviceInterface.getDeviceValues()
}, 500)

// // periodic logger for debugging
// setInterval(() => {
//   console.log(`----------------- START: SERVER STATS -----------------`)
//   console.log(deviceInterface.devices)
//   console.log(dataStore)
//   console.log(`------------------- END: SERVER STATS -----------------`)
// }, 10000)

let dataStore = {
  deviceAlarms: {},   // key = deviceId
  users: {},          // key = userId
  contacts: {},       // key = userId
}

let port = process.env.PORT || 3002
let router = koaRouter()
let app = new Koa()

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
