const mysql = require('mysql')
const db_config = require('../config/db')
const pool = mysql.createPool({
  host: db_config.host,
  user: db_config.user,
  password: db_config.passowrd,
  database: db_config.database
})


const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err) 
        return 
      }
      connection.query(sql, values, (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows)
        connection.release()
      })
    })
  })
}
module.exports = query
