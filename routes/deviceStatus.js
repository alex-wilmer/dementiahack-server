
export default ({ router, dataStore, deviceInterface }) => {
  router.get(`/deviceStatus/:deviceId`, async ctx => {
    let { deviceId } = ctx.params
    if (!deviceId) {
      ctx.body = { success: false, error: `missing deviceId` }
      return
    }
    let isOn, timeOn
    let device = dataStore.devices[deviceId]
    let currentValue = deviceInterface.getDeviceValue(deviceId)
    if (device) {
      let { watcher, threshold } = device
      isOn = currentValue >= threshold
      timeOn = watcher && watcher.dangerStamp ? Date.now() - watcher.dangerStamp : null
    }
    console.log(JSON.stringify({ ...device, currentValue }, null, 2))
    ctx.body = { currentValue, isOn, timeOn }
  })
}
