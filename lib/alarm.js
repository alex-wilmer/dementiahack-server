
import mail from './mail'
import sms from './sms'

export default async ({ deviceId, userId, dataStore, firebaseAdmin }) => {
  let device = dataStore.devices[deviceId]
  let alarm = dataStore.deviceAlarms[deviceId]
  let { contacts } = dataStore.users[userId]
  let deviceName = device.name || deviceId
  console.log(`ALARM! deviceId: ${deviceId}, userId: ${userId}`)
  let time = alarm.time > 60 ? `${Math.round(alarm.time / 60)} minutes` : `${alarm.time} seconds`
  let message = {
    notification: {
      title: `Alert`,
      body: `${deviceName} has been on for at least ${time}`,
    },
  }
  if (device.notificationId) {
    await firebaseAdmin.messaging().sendToDevice(device.notificationId, message)
  }
  contacts.forEach(contact => {
    let { email, phone } = contact
    if (email) {
      mail({ email, subject: message.notification.title, message: message.notification.body })
    }
    if (false && phone) {
      sms({
        to: phone,
        body: message.notification.body,
      })
    }
  })
}
