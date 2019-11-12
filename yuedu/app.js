const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const jwt = require('koa-jwt2')
const response_formatter = require('./middleware/response_formatter')
const cors = require('koa2-cors')

const index = require('./routes/index')
const path = require('path')
const static = require('koa-static')

// error handler
onerror(app)

app.use(cors({
  origin: function (ctx) {
    return '*'; 
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'a'],
}))
// middlewares
app.use(static(path.join(__dirname, './www')))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


app.use(json())


app.use(logger())
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(response_formatter)

/* app.use(jwt({
  secret: jwt_config.secret
}).unless({
  path: [/\/api\//]
})) */


// routes
app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



module.exports = app
