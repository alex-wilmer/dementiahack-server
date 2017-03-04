
export default ({ router, dataStore }) => {
  router.post(`/registerAlarm`, async ctx => {
    let { userId, deviceId, safeZone, dangerZone, timer } = ctx.request.body
    if (!deviceId || !userId || !safeZone || !dangerZone || !timer) {
      ctx.body = { success: false, error: `missing required parameters` }
      return
    }
    if (!dataStore.users[userId]) {
      ctx.body = { success: false, error: `user has not registered a device yet` }
      return
    }
    if (!dataStore.users[userId].devices.includes(deviceId)) {
      ctx.body = { success: false, error: `that device has not been registered to the user` }
      return
    }
    dataStore.deviceAlarms[deviceId] = { userId, safeZone, dangerZone, timer }
    console.log(`/registerAlarm :: deviceId: ${deviceId}, alarm: `,
      dataStore.deviceAlarms[deviceId]
    )
    ctx.body = { success: true }
  })
}
