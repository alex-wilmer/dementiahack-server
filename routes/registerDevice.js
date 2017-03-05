
export default ({ router, dataStore }) => {
  router.post(`/registerDevice`, async ctx => {
    let { deviceId, userId } = ctx.request.body
    if (!deviceId || !userId) {
      ctx.body = { success: false, error: `missing deviceId or userId` }
      return
    }
    if (!dataStore.users[userId]) {
      dataStore.users[userId] = {
        devices: [deviceId],
        contacts: [],
      }
    }
    else {
      dataStore.users[userId].devices = [...dataStore.users[userId].devices, deviceId]
    }
    dataStore.devices[deviceId] = { ...dataStore.devices[deviceId], deviceId }
    console.log(`/registerDevice :: userId: ${userId}, devices: `, dataStore.users[userId].devices)
    ctx.body = { success: true }
  })
}
