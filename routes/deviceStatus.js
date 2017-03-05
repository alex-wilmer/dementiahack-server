
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
      console.log(123, watcher)
      if (watcher) {
        console.log(456, watcher.dangerStamp)
      }
      timeOn = watcher && watcher.dangerStamp ? Date.now() - watcher.dangerStamp : null
      isOn = currentValue >= threshold
    }
    console.log(`/deviceStatus`, JSON.stringify({ ...device, currentValue, isOn, timeOn }, null, 2))
    ctx.body = { currentValue, isOn, timeOn }
  })
}
