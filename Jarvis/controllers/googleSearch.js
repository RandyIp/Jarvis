const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch(process.env.TOKEN)

const googleSearch = (req, res) => {
  console.log(req, res)
  search.json({
    q: "Coffee",
    location: "Austin, TX"
  }, (result) => {
    res.send(result)
  })
}

module.exports = googleSearch