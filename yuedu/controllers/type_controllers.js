const type_model = require('../db/type_model')
const get_types = async (ctx) => {
  try {
    const types = await type_model.type_select()
    ctx.body = types
  } catch (error) {
    ctx.throw(400, error)
  }
}

const get_type_by_id = async (ctx) => {
  const {id} = ctx.params
  try {
    const [type] = await type_model.type_select_by_id(id)
    ctx.body = type
  } catch (error) {
    ctx.throw(400, error)
  }
} 

module.exports = {
  get_types,
  get_type_by_id
}