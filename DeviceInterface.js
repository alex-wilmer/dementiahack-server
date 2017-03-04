import Particle from 'particle-api-js'

class DeviceInterface {
  token = ``
  particle = {}
  devices = {}

  constructor() {
    this.particle = new Particle()
  }

  login = async (username, password) => {
    try {
      let response = await this.particle.login({ username, password })
      this.token = response.body.access_token
      this.log(`logged in as ${username}, token: ${this.token}`)
    }
    catch (e) {
      this.log(`error logging in to particle: ${e}`)
    }
  }

  getDeviceValues = async () => {
    try {
      let response = await this.particle.listDevices({ auth: this.token })
      for (let device of response.body) {
        let value = await this.particle.getVariable({
          deviceId: device.id,
          name: `analogvalue`,
          auth: this.token,
        })
        this.devices[device.id] = value.body.result
      }
    }
    catch(e) {
      this.log(`error getting device values: ${e}`)
    }
  }

  getDeviceValue = id => this.devices[id]

  log = (message) => {
    console.log(`PARTICLE:: ${message}`)
  }
}

export default DeviceInterface
