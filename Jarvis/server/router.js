const express = require('express')
const router = express.Router()
const KeyWords = require('../controllers/KeyWords.js')
const translator = require('../controllers/translator.js')

router.get('/keywords', (req, res) => KeyWords.get(req, res))
router.post('/keywords', (req, res) => KeyWords.post(req, res))
router.delete('/keywords', (req, res) => KeyWords.delete(req, res))
router.post('/translator', (req, res) => translator.post(req, res))

module.exports = router