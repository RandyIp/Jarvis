56 lines(48 sloc)  2.67 KB

require('dotenv').config()
const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

module.exports = pool