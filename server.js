import DeviceInterface from './DeviceInterface'
import Koa from 'koa'
import cors from 'kcors'
import koaRouter from 'koa-router'
import html from './html'
import Home from './Home'

let username = `djazium@gmail.com`
let password = `musicwizard3`

let deviceInterface = new DeviceInterface()
deviceInterface.login(username, password)
setInterval(deviceInterface.getDeviceValues, 500)

let port = process.env.PORT || 3002
let router = koaRouter()
let app = new Koa()

router
  .get(`/`, ctx => {
    ctx.body = html(Home)
  })
  .get(`/value/:id`, async ctx => {
    console.log(ctx.params.id)
    ctx.body = deviceInterface.getDeviceValue(ctx.params.id)
  })

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
