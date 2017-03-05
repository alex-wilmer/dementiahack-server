
export default ({ router, dataStore }) => {
  router.get(`/listDevices/:userId`, async ctx => {
    let { userId } = ctx.params
    if (!userId) {
      ctx.body = { success: false, error: `missing userId` }
      return
    }
    if (!dataStore.users[userId]) {
      ctx.body = { success: false, error: `user does not exist` }
      return
    }

    let devices = dataStore.users[userId].devices.map(deviceId => {
      let { notificationId, threshold } = dataStore.devices[deviceId]
      return {
        deviceId,
        notificationId,
        threshold,
        alarm: dataStore.deviceAlarms[deviceId],
      }
    })
    console.log(`/listDevices :: userId: ${userId}, devices: ${devices}`)
    ctx.body = { devices }
  })
}
