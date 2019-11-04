module.exports  = async (ctx, next) => {
  try {
    await next()
    ctx.body ? ctx.body = {
      res_code: 200,
      res_msg: '请求成功',
      res: ctx.body
    } : ctx.body = {
      res_code: 404, 
      res_msg: '未请求到内容'
    }
    console.log(ctx.body.res)

  } catch (err) {
    ctx.body = {
      res_code: err.status,
      res_msg: err.message
    }
  }
}