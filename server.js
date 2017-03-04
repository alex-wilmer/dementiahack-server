
import Koa from 'koa'
import koaRouter from 'koa-router'
import html from './html'
import Home from './Home'

/*----------------------------------------------------------------------------*/

let port = process.env.PORT || 3002
let router = koaRouter()
let app = new Koa()

/*----------------------------------------------------------------------------*/

router
  .get(`/`, ctx => {
    ctx.body = html(Home)
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
