
export default ({ router, dataStore }) => {
  router.post(`/registerDeviceThreshold`, async ctx => {
    let { deviceId, threshold } = ctx.request.body
    if (!deviceId || !threshold) {
      ctx.body = { success: false, error: `missing deviceId or threshold` }
      return
    }
    dataStore.deviceThresholds[deviceId] = threshold
    console.log(`/registerDeviceThreshold :: deviceId: ${deviceId}, threshold: ${threshold}`)
    ctx.body = { success: true }
  })
}
