
import mail from './mail'

export default async ({ deviceId, userId, dataStore, firebaseAdmin }) => {
  let device = dataStore.devices[deviceId]
  let alarm = dataStore.deviceAlarms[deviceId]
  let { contacts } = dataStore.users[userId]
  let deviceName = device.name || deviceId
  let message = {
    notification: {
      title: `Alert`,
      body: `${deviceName} has been on for at least ${Math.round(alarm.time / 60)} minutes`,
    },
  }
  await firebaseAdmin.messaging().sendToDevice(device.notificationId, message)
  contacts.forEach(contact => {
    let { email, phone } = contact
    if (email) {
      mail({ email, subject: message.notification.title, message: message.notification.body })
    }
    if (phone) {
      console.log(`send sms to ${phone}`)
    }
  })
}
