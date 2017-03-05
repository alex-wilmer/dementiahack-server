
export default ({ router, dataStore }) => {
  router.post(`/setDeviceApplianceName`, async ctx => {
    let { deviceId, name } = ctx.request.body
    if (!deviceId || !name) {
      ctx.body = { success: false, error: `missing deviceId or name` }
      return
    }
    dataStore.devices[deviceId] = { ...dataStore.devices[deviceId], name }
    console.log(`/setDeviceApplianceName :: deviceId: ${deviceId}, device: `,
      dataStore.devices[deviceId]
    )
    ctx.body = { success: true }
  })
}
