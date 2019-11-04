const query = require('./index')

class CommentModel {
  constructor () {}

  static comments_select_limit_by_articleid (values) {
    const _sql = `SELECT id, user_id, (SELECT avatar FROM t_users WHERE id = t_comments.user_id) as avatar, (SELECT nikiname FROM t_users WHERE id = t_comments.user_id) as nikiname, article_id, content, DATE_FORMAT(created_time, '%Y/%m/%d %H:%i') as reply_time FROM t_comments  WHERE article_id = ? ORDER BY id DESC LIMIT ?`
    return query(_sql, values)
  }

  static comments_insert (values) {
    const _sql = `INSERT INTO t_comments SET ?`
    return query(_sql, values)
  }

  static comments_delete_by_id (values) {
    const _sql = `DELETE FROM t_comments WHERE id = ?`
    return query(_sql, values)
  }

  static comment_select_by_id (values) {
    const _sql = `SELECT id, user_id, (SELECT nikiname FROM t_users WHERE id = t_comments.user_id) as nikiname, (SELECT avatar FROM t_users WHERE id = t_comments.user_id) as avatar, article_id, content, DATE_FORMAT(created_time, '%Y/%m/%d %H:%i') as reply_time FROM t_comments WHERE id = ?`
    return query(_sql, values)
  } 
}

module.exports = CommentModel