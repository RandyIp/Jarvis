pool = require('../db/pg.js')

//need to update on deployment a few more times
const translator = {
  post: async (req, res) => {
    result = await pool.query(`
    SELECT word, keyword FROM keywords WHERE word = ANY($1) AND func = $2;`,
      [req.body.wordArray, req.body.func])

    res.status(201)
    res.send(result.rows)
  }
}

module.exports = translator
