const express = require('express')
const router = express.Router()

const Url = require('../models/Url')

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ newUrl: req.params.code })

    if (url) {
      return res.redirect(url.longUrl)
    }
    else {
      return res.status(400)
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
} )

module.exports = router