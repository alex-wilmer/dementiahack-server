
export default ({ router, dataStore }) => {
  router.post(`/registerDevice`, async ctx => {
    let { deviceId, userId } = ctx.request.body
    if (!deviceId || !userId) {
      ctx.body = { success: false, error: `missing deviceId or userId` }
      return
    }
    if (!dataStore.users[userId]) {
      dataStore.users[userId] = { devices: [deviceId] }
    }
    else {
      dataStore.users[userId].devices = [...dataStore.users[userId].devices, deviceId]
    }
    if (!dataStore.devices[deviceId]) {
      dataStore.devices[deviceId] = {}
    }
    console.log(`/registerDevice :: userId: ${userId}, devices: `, dataStore.users[userId].devices)
    ctx.body = { success: true }
  })
}
