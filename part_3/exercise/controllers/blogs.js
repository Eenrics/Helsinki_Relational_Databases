const router = require('express').Router()
require('express-async-errors')
const { Blog, User } = require('../models')
const {Op} = require('sequelize')
const {tokenExtractor} = require('../utils/middleware')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    // where.title = {
    //   [Op.substring]: req.query.search
    // }
    where[Op.or] = [
      {
        title: {
            [Op.substring]: req.query.search
          }
      },
      {
        author: {
            [Op.substring]: req.query.search
          }
      }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: {exclude: ['userId']},
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }
  
  router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  })
  
  router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
    if (req.blog) {
      if (req.blog.userId === req.decodedToken.id) {
        await req.blog.destroy()
      } else {
        res.status(401).json({error: "Only users who own blogs can delete"})
      }
    }
    res.status(204).end()
  })
  
  router.put('/:id', blogFinder, async (req, res) => {
    try {
      if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      return res.status(400).json({error})
    }
  })

module.exports = router