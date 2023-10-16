const router = require('express').Router()
const {tokenExtractor} = require('../utils/middleware')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id'] } ,
    include: {
      model: Blog,
      as: 'reading_lists',
      attributes: { exclude: ['userId']},
      through: {
        attributes: ['read']
      },
    }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if ((!user.admin && !req.body.username) || (!user.admin && req.body.disabled)) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
        username: req.params.username
    }
  })
  if (user) {
    if (req.body.disabled) {
      user.disabled = req.body.disabled
    }
    if (req.body.username) {
      user.username = req.body.username
    }
    user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router