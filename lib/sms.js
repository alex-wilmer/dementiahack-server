import twilio from 'twilio'

import { twilio as twilioConfig } from '../config'

let client = twilio(twilioConfig.sid, twilioConfig.authToken)

export default ({ to, body }) => {
  let message = { to, body, from: twilioConfig.sendingNumber }
  client.messages.create(message)
  console.log(`sms sent: `, message)
}
