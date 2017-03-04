
import DeviceInterface from './DeviceInterface'

let username = `djazium@gmail.com`
let password = `musicwizard3`

let main = async () => {
  let deviceInterface = new DeviceInterface()
  await deviceInterface.login(username, password)
  let values = await deviceInterface.getDeviceValues()
  console.log(values)
}

main()
