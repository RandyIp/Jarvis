pool = require('../db/pg.js')

const translator = {
  get: async (req, res) => {
    result = await pool.query(`
    SELECT word, keyword FROM keywords WHERE word = ANY($1) AND func = $2;`,
      [req.body.wordArray, req.body.func])

    res.status(200)
    res.send(result.rows)
  }
}

module.exports = translator
