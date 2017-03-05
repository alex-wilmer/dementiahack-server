import alarm from './alarm'

let alarmPeriod = 10

export default ({ dataStore, deviceInterface, firebaseAdmin }) => {
  deviceInterface.getDeviceValues()
  Object.keys(dataStore.deviceAlarms).forEach(deviceId => {
    let { watcher, threshold } = dataStore.devices[deviceId]
    let deviceAlarm = dataStore.deviceAlarms[deviceId]
    let currentValue = deviceInterface.getDeviceValue(deviceId)
    if (!watcher) {
      watcher = {
        dangerStamp: 0,
        lastAlarm: 0,
      }
    }
    console.log(9, currentValue, threshold, watcher, deviceAlarm)
    if (currentValue >= threshold && watcher.dangerStamp === 0) {
      console.log(`device ${deviceId} entered the danger zone`)
      watcher.dangerStamp = Date.now()
      watcher.lastAlarm = 0
    }
    else if (currentValue < threshold && watcher.dangerStamp > 0) {
      console.log(`device ${deviceId} is out of the danger zone`)
      watcher.dangerStamp = 0
    }

    if (watcher.dangerStamp > 0 && Date.now() - watcher.dangerStamp >= deviceAlarm.time * 1000) {
      if (watcher.lastAlarm === 0 || Date.now() - watcher.lastAlarm > alarmPeriod * 1000) {
        alarm({ deviceId, userId: deviceAlarm.userId, dataStore, firebaseAdmin })
        watcher.lastAlarm = Date.now()
      }
    }

    dataStore.devices[deviceId].watcher = watcher
  })
}
