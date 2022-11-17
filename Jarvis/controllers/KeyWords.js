pool = require('../db/pg.js')

const KeyWords = {
  get: async (req, res) => {
    result = await pool.query(`SELECT DISTINCT keyword FROM keywords;`)
    result1 = await pool.query('SELECT word FROM keywords;')
    res.status(200)
    res.send([result.rows, result1.rows])
  },
  post: async (req, res) => {
    await pool.query(`INSERT INTO keywords(word, func, keyword, numCorrect, numTotal) values ($1,$2,$3,$4,$5)
    on conflict (word) do nothing;
    `, [req.body.word, req.body.func, req.body.keyword, req.body.numCorrect || 0, 1])
    res.status(201)
    res.send('Created!')
  },
  delete: (req, res) => {
    pool.query(`DELETE FROM keywords WHERE keyword = $1`, [req.body.keyword])
    res.status(204)
    res.send('Deleted!')
  }
}

module.exports = KeyWords