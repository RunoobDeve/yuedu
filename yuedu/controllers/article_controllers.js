const article_model = require('../db/article_model')
const type_model = require('../db/type_model')
const get_articles_limit = async (ctx) => {
  const {type_id, page} = ctx.params
  try {
    const articles = await article_model.articles_select_limit_by_typeid([type_id, [(page - 1) * 10, 10]])
    const [{count}] = await article_model.articles_select_count(type_id)
    ctx.body = {
      articles, count, page: +page
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

const get_articles_top10 = async (ctx) => {
  const {type_id} = ctx.params
  try {
    const articles = await article_model.articles_select_top10(type_id)
    const [{type}] = await type_model.type_select_by_id(type_id)
    ctx.body = {
      articles,
      type
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

const get_articles_rand = async (ctx) => {
  try {
    const articles = await article_model.articles_select_rand()
    ctx.body = articles
  } catch (error) {
    ctx.throw(400, error)
  }
}

const get_articles_typeid_rand = async (ctx) => {
  const {type_id} = ctx.params
  try {
    const articles = await article_model.articles_select_by_type_rand(type_id)
    ctx.body = articles
  } catch (error) {
    ctx.throw(400, error)
  }
}

const get_article = async (ctx, next) => {
  const {id} = ctx.params
  try {
    const [article] = await article_model.article_select_by_id(id)
    // console.log(ctx.state.user)
    if (ctx.state.user) {
      const user_id = ctx.state.user ? ctx.state.user.id : null
      const res = await article_model.article_isLike([id, user_id])
      
      if (res[0]) {
        article.isLiked = true
      } else {
        article.isLiked = false
      }
    } else {
      article.isLiked = false
    }
    ctx.body = article
  } catch (error) {
    ctx.throw(400, error)
  }
}


const like_article = async (ctx) => {
  const article_id = ctx.params.id
  // 获取token
  // const token = ctx.header.authorization.split(' ')[1]

  console.log(ctx.state.user)
  try {
    await article_model.article_insert_like({article_id, user_id: ctx.state.user.id})
    ctx.body = '成功'
  } catch (error) {
    ctx.throw(400, error)
  }
}


const cancel_like_article = async (ctx) => {
  const article_id = ctx.params.id
  console.log(article_id)
  const user_id = ctx.state.user.id
  try {
    await article_model.article_delete_like([article_id, user_id])
    console.log(1);

    ctx.body = '成功'
  } catch (error) {
    ctx.throw(400, error);    
  }
}

const collection_article = async (ctx) => {
  const {article_id} = ctx.params
  try {
    await article_model.article_insert_connection([article_id, user_id])
  } catch (error) {
    ctx.throw(400, error)
  }
}

const cancel_collection_article = async (ctx) => {
  const {article_id} = ctx.params
  try {
    await article_model.article_delete_connection([article_id, user_id])
  } catch (error) {
    ctx.throw(400, error)
  }
}

const get_article_like = async (ctx) => {
  try {
    const articles = await article_model.article_like(ctx.state.user.id)
    ctx.body = articles
  } catch (error ) {
    ctx.throw(400, error)
  }
}



module.exports = {
  get_articles_limit,
  get_articles_rand,
  get_articles_typeid_rand,
  get_articles_top10,
  get_article,
  like_article,
  cancel_like_article,
  like_article,
  cancel_collection_article,
  get_article_like
}