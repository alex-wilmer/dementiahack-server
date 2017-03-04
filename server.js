import DeviceInterface from './DeviceInterface'
import Koa from 'koa'
import cors from 'kcors'
import bp from 'koa-bodyparser'
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
    ctx.body = deviceInterface.getDeviceValue(ctx.params.id)
  })
  .post(`/test`, async ctx => {
    console.log(123, ctx.request.body)
    ctx.body = `hey`
  })

app
  .use(cors())
  .use(bp())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
