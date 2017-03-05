
export default ({ router, dataStore }) => {
  router.post(`/registerNotificationId`, async ctx => {
    let { deviceId, notificationId } = ctx.request.body
    if (!deviceId || !notificationId) {
      ctx.body = { success: false, error: `missing deviceId or notificationId` }
      return
    }
    dataStore.devices[deviceId] = { ...dataStore.devices[deviceId], notificationId }
    console.log(`/registerDeviceThreshold :: deviceId: ${deviceId}, device: `, dataStore.devices[deviceId])
    ctx.body = { success: true }
  })
}
