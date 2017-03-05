
export default ({ router, dataStore }) => {
  router.post(`/registerDeviceThreshold`, async ctx => {
    let { deviceId, threshold } = ctx.request.body
    if (!deviceId || !threshold) {
      ctx.body = { success: false, error: `missing deviceId or threshold` }
      return
    }
    dataStore.devices[deviceId].threshold = threshold * 0.8
    console.log(`/registerDeviceThreshold :: deviceId: ${deviceId}, device: `,
      dataStore.devices[deviceId]
    )
    ctx.body = { success: true }
  })
}
