const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7), SECRET)
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
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
