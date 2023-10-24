const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const Session = require('../models/sessions')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7), SECRET)
        const rawToken = authorization.substring(7)
        const decodedToken = jwt.verify(rawToken, SECRET)
        const session = await Session.findOne({"user_id": decodedToken.id})
        if (!session || !session.token || session.token !== rawToken) return res.status(401).json({ error: 'token invalid' })
        req.decodedToken = decodedToken
      } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }

  const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }

module.exports = { tokenExtractor, blogFinder }
