const query = require('./index')

class UserModel {
  constructor () {

  }
  
  static user_insert (values) {
    const _sql = `INSERT INTO t_users SET ?`
    return query(_sql, values)
  }

  static user_select_by_id (values) {
    const _sql = `SELECT id, nikiname, avatar, (SELECT count(id) FROM t_follow WHERE user_id = t_users.id) as follow_count, (SELECT count(id) FROM t_fans WHERE user_id = t_users.id) as fans_count, DATE_FORMAT(created_time, '%Y年%m月%d日') as created_time FROM t_users WHERE id = ?`
    return query(_sql, values)
  }

  static user_select_by_nikiname (values) {
    const _sql = `SELECT ?? FROM t_users WHERE nikiname = ?`
    return query(_sql, values)
  }

  static user_select_by_email (values) {
    const _sql = `SELECT ?? FROM t_users WHERE email = ?`
    return query(_sql, values)
  }

  static user_update_by_id (values) {
    const _sql = `UPDATE t_users SET ? WHERE id = ?`
    return query(_sql, values)
  }

  static user_check_email (values) {
    const _sql = `SELECT nikiname from t_users WHERE email = ?`
    return query(_sql, values)
  }
}


module.exports = UserModel