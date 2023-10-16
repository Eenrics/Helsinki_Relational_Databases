const router = require('express').Router()
require('express-async-errors')
const { Blog, User, UserBlogs } = require('../models')
const {Op} = require('sequelize')

router.post('/', async (req, res) => {
  try {
    console.log({userId: req.body.userId})
    const user = await User.findByPk(parseInt(req.body.userId))
    if (!user) return res.status(404).json({error: 'user not found'})
    
    const blog = await Blog.findByPk(parseInt(req.body.blogId))
    console.log({blog})
    if (!blog) return res.status(404).json({error: 'blog not found'})

    const readingList = await UserBlogs.create({userId: user.id, blogId: blog.id})
    res.json(readingList)

  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router