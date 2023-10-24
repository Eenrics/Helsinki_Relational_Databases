const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')
const Session = require('../models/sessions')

router.post('/', async (request, response) => {
  const body = request.body
  console.log({user: body.username})

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  let session = await Session.findOne({"user_id": user.id})
  if (!session) {
    session = await Session.create({userId: user.id, token})
  } else {
    session.token = token
    await session.save()
  }

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router