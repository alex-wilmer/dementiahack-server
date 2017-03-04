import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import koaRouter from 'koa-router'

import { particle } from './config'
import DeviceInterface from './DeviceInterface'

let deviceInterface = new DeviceInterface()
deviceInterface.login(particle.username, particle.password)
setInterval(deviceInterface.getDeviceValues, 500)

let deviceAlarms = {} // key = deviceId
let users = {} // key = userId

let port = process.env.PORT || 3002
let router = koaRouter()
let app = new Koa()

router
  .post(`/registerDevice`, async ctx => {
    let { deviceId, userId } = ctx.request.body
    if (!deviceId || !userId) {
      ctx.body = { success: false, error: `missing deviceId or userId` }
      return
    }
    if (!users[userId]) {
      users[userId] = { devices: [deviceId] }
    }
    else {
      users[userId].devices = [...users[userId].devices, deviceId]
    }
    console.log(`/registerDevice :: deviceId: ${deviceId}, userId: ${userId}`)
    ctx.body = { success: true }
  })
  .post(`/registerAlarm`, async ctx => {
    let { userId, deviceId, safeZone, dangerZone, timer } = ctx.request.body
    if (!deviceId || !userId || !safeZone || !dangerZone || !timer) {
      ctx.body = { success: false, error: `missing required parameters` }
      return
    }
    if (!users[userId]) {
      ctx.body = { success: false, error: `user has not registered a device yet` }
      return
    }
    if (!users[userId].devices.includes(deviceId)) {
      ctx.body = { success: false, error: `that device has not been registered to the user` }
      return
    }
    deviceAlarms[deviceId] = { userId, safeZone, dangerZone, timer }
    console.log(`/registerAlarm :: deviceId: ${deviceId}, alarm: `, deviceAlarms[deviceId])
    ctx.body = { success: true }
  })
  .get(`/deviceStatus/:deviceId`, async ctx => {
    let { deviceId } = ctx.params
    if (!deviceId) {
      ctx.body = { success: false, error: `missing deviceId` }
      return
    }
    let value = deviceInterface.getDeviceValue(deviceId)
    console.log(`/deviceStatus :: deviceId: ${deviceId}, value: ${value}`)
    ctx.body = { value }
  })

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
