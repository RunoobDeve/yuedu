const comment_model = require('../db/comment_model')
const token_verify = require('../utils/token_verify')
const jwt_config = require('../config/jwt_config')

const get_comments_limit = async (ctx) => {
  const {article_id, page} = ctx.params
  const token = ctx.header.authorization
  let user_id = 0
  if (token) {
    try {
      const result = await token_verify(token.split(' ')[1], jwt_config.secret)
      user_id = result.id
    } catch (err) {
      user_id = 0
    }
    
  }
  
  try {
    let comments = await comment_model.comments_select_limit_by_articleid([article_id, [(page - 1) * 10, 10]])
    comments = comments.map(comment => {
      return {
        isDel: user_id === comment.user_id,
        ...comment
      }
    })
    comments.length ? (ctx.body = comments) : ctx.throw(400, '暂无评论')
  } catch (error) {
    ctx.throw(400, error)
  }
}

const add_comment = async (ctx) => {
  const comment = {article_id, content} = ctx.request.body
  const user_id = ctx.state.user.id
  // const user_id = 
  comment.user_id = user_id
  try {
    const result = await comment_model.comments_insert(comment)
    const id = result.insertId
    const [comment_insert] = await comment_model.comment_select_by_id(id)
    comment_insert.isDel = true
    ctx.body = comment_insert
  } catch (error) {
    ctx.throw(400, error)
  }
}

const remove_comment = async (ctx) => {
  const {id} = ctx.params
  try {
    const result = await comment_model.comments_delete_by_id(id)
    ctx.body = {}
  }catch (error) {
    ctx.throw(400, error)
  }
}

module.exports = {
  get_comments_limit,
  add_comment,
  remove_comment
}