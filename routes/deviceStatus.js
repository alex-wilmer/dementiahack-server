
export default ({ router, deviceInterface }) => {
  router.get(`/deviceStatus/:deviceId`, async ctx => {
    let { deviceId } = ctx.params
    if (!deviceId) {
      ctx.body = { success: false, error: `missing deviceId` }
      return
    }
    let value = deviceInterface.getDeviceValue(deviceId)
    console.log(`/deviceStatus :: deviceId: ${deviceId}, value: ${value}`)
    ctx.body = { value }
  })
}
