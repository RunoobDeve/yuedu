const jwt = require('jsonwebtoken')
const token_verify = require('../utils/token_verify')
const jwt_config = require('../config/jwt_config')

module.exports = async (ctx, next) => {
  const token = ctx.header.authorization
  if (token) {
    try {
      const res = await token_verify(token.split(' ')[1], jwt_config.secret)
      ctx.state.user = res
    } catch (error) {
      // ctx.throw(401, 1)
    }
  } 
  await next()

}
