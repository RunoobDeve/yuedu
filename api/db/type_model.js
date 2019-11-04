const query = require('./index')

class TypeModel {
  constructor () {}

  static type_select () {
    const _sql = `SELECT id, type FROM t_types`
    return query(_sql)
  }

  static type_select_by_id (values) {
    const _sql = `SELECT id, type FROM t_types WHERE id = ?`
    return query(_sql, values)
  }

  static type_insert (values) {
    const _sql = `INSERT INTO t_types SET type = ?`
    return query(_sql, values)
  }

  static type_update (values) {
    const _sql = `UPDATE t_types SET ? WHERE id = ?`
    return query(_sql, values)
  }

  static type_delete (values) {
    const _sql = `DELETE FROM t_types WHERE id = ?`
    return query(_sql, values)
  }
}

module.exports = TypeModel