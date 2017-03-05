
export default ({ router, dataStore }) => {
  router.post(`/registerDeviceThreshold`, async ctx => {
    let { deviceId, threshold } = ctx.request.body
    if (!deviceId || !threshold) {
      ctx.body = { success: false, error: `missing deviceId or threshold` }
      return
    }
    dataStore.devices[deviceId] = { ...dataStore.devices[deviceId], threshold }
    console.log(`/registerDeviceThreshold :: deviceId: ${deviceId}, device: `,
      dataStore.devices[deviceId]
    )
    ctx.body = { success: true }
  })
}
