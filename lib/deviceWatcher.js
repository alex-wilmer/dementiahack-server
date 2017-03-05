
let maxDangerCount = 5
let alarmPeriod = 10

export default ({ dataStore, deviceInterface }) => {
  deviceInterface.getDeviceValues()
  Object.keys(dataStore.deviceAlarms).forEach(deviceId => {
    let { watcher, threshold } = dataStore.devices[deviceId]
    let alarm = dataStore.deviceAlarms[deviceId]
    let currentValue = deviceInterface.getDeviceValue(deviceId)
    if (!watcher) {
      watcher = {
        dangerCount: 0,
        dangerStamp: 0,
        lastAlarm: 0,
      }
    }
    if (currentValue >= threshold && watcher.dangerCount < maxDangerCount) {
      if (++watcher.dangerCount === maxDangerCount) {
        console.log(`device ${deviceId} entered the danger zone`)
        watcher.dangerStamp = Date.now()
        watcher.lastAlarm = 0
      }
    }
    else if (currentValue < threshold && watcher.dangerCount > 0) {
      if (--watcher.dangerCount === 0) {
        console.log(`device ${deviceId} is out of the danger zone`)
        watcher.dangerStamp = 0
      }
    }
    if (watcher.dangerStamp > 0 && Date.now() - watcher.dangerStamp >= alarm.time * 1000) {
      if (watcher.lastAlarm === 0 || Date.now() - watcher.lastAlarm > alarmPeriod * 1000) {
        console.log(`ALARM! ALARM! ALARM!`)
        watcher.lastAlarm = Date.now()
      }
    }
    dataStore.devices[deviceId].watcher = watcher
  })
}
