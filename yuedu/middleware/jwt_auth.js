const jwt = require('jsonwebtoken')
const token_verify = require('../utils/token_verify')
const jwt_config = require('../config/jwt_config')

module.exports = async (ctx, next) => {
  const token = ctx.header.authorization
  console.log(token)
  if (token) {
    try {
      const res = await token_verify(token.split(' ')[1], jwt_config.secret)
      console.log(res)
      ctx.state.user = res
      await next()
    } catch (error) {
      ctx.throw(401, error)
    }
  }else {
    ctx.throw(401, 'token is not defined')
  }
}