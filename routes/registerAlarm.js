
export default ({ router, dataStore }) => {
  router.post(`/registerAlarm`, async ctx => {
    let { userId, deviceId, time } = ctx.request.body
    console.log(`register alarm 0`, ctx.request.body)
    if (!deviceId || !userId || !time) {
      console.log(`register alarm 1`, ctx.request.body)
      ctx.body = { success: false, error: `missing required parameters` }
      return
    }
    if (!dataStore.users[userId]) {
      console.log(`register alarm 2`, ctx.request.body)
      ctx.body = { success: false, error: `user has not registered a device yet` }
      return
    }
    if (!dataStore.users[userId].devices.includes(deviceId)) {
      console.log(`register alarm 3`, ctx.request.body)
      ctx.body = { success: false, error: `that device has not been registered to the user` }
      return
    }
    if (!dataStore.devices[deviceId].threshold) {
      console.log(`register alarm 4`, ctx.request.body)
      ctx.body = { success: false, error: `please set a device threshold before adding an alarm` }
      return
    }
    dataStore.deviceAlarms[deviceId] = { userId, time }
    console.log(`/registerAlarm :: deviceId: ${deviceId}, alarm: `,
      dataStore.deviceAlarms[deviceId]
    )
    ctx.body = { success: true }
  })
}
