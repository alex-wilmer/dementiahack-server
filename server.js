
import Particle from 'particle-api-js'

let username = `djazium@gmail.com`
let password = `musicwizard3`

let main = async () => {
  let particle = new Particle()
  let response = await particle.login({ username, password })
  let token = response.body.access_token
  console.log(token)
  response = await particle.listDevices({ auth: token })
  let deviceId = response.body[0].id
  let light = await particle.getVariable({ deviceId, name: `analogvalue`, auth: token })
  console.log(light)
}

main()
