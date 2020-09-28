const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

//Include model
const Url = require('../models/Url')

//Post request to endpoint
router.post('/shorten', async (req, res) => {

  //Include model
  const { longUrl } = req.body
  const baseUrl = config.get('baseURL')

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Internal error')
  }

  //generate new URL
  const newUrl = shortid.generate()

  //check if longURL from client is valid
  if (validUrl.isUri(longUrl)) {
    try {
      //check if longURL already exists in DB
      let url = await Url.findOne({ longUrl })

      //return url object if already exists in DB
      if (url) {
        res.json(url)
      }
      else {
        //Put together shortURL
        const shortUrl = baseUrl + '/' + newUrl
        url = new Url({
          newUrl,
          longUrl,
          shortUrl
        })

        await url.save()
        
        res.json(url)
      }
    }
    catch (err) {
      console.error(err)
      res.status(500).json('Server error')
    }
  }
  else {
    return res.status(401).json('Invalid longUrl')
  }
})

module.exports = router
