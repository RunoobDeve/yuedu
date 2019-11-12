const user_model = require('../db/user_model')
const jwt = require('jsonwebtoken')
const jwt_config = require('../config/jwt_config')

const login = async (ctx) => {
  
  const {email, password} = ctx.request.body
  try {
    let user = await user_model.user_select_by_email([['id', 'password', 'nikiname', 'email'], email])
    if (user.length) {
      user = user[0]
      if (user.password === password) {
        const token_user = {email: user.email, nikiname: user.nikiname, id: user.id}        
        const token = jwt.sign(token_user, jwt_config.secret, {expiresIn: '2h'})
        ctx.body = {
          user: token_user,
          token
        }
      } else {
        ctx.throw(400, '用户名或密码错误')
      }
    } else {
      ctx.throw(400, '用户名不存在')
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

const register = async (ctx) => {
  const user =  {username, password, nikiname, email} = ctx.request.body

  const checkEmail = await user_model.user_check_email(email)
  console.log(checkEmail)
  if (checkEmail.length) {
    ctx.throw(400, '邮箱被占用')
  } else {
    const res = await user_model.user_insert(user)
    ctx.body = "注册成功"
  }
  
}

const get_user = async (ctx) => {
  const {id} = ctx.params
  try {
    const user = await user_model.user_select_by_id(id)
    ctx.body = user
  } catch (error) {
    ctx.throw(400, error.code)
  }
}

const auth_token = async (ctx) => {
  ctx.body = '已登录'
}
module.exports = {
  login,
  register,
  get_user,
  auth_token
}
