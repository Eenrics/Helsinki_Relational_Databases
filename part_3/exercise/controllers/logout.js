const router = require('express').Router()
const {tokenExtractor} = require('../utils/middleware')
const Session = require('../models/sessions')

router.delete('/', tokenExtractor, async (req, res) => {
  try {
    const session = await Session.findOne({"user_id": req.decodedToken.id})
    if (session) {
      session.token = null
      await session.save()
    }
    return res.status(204).end()
  } catch(error) {
    return res.status(204).end()
  }
})

module.exports = router