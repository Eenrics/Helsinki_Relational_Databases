const router = require('express').Router()
require('express-async-errors')
const { Blog, User, UserBlogs } = require('../models')
const {Op} = require('sequelize')
const {tokenExtractor} = require('../utils/middleware') 

router.post('/', async (req, res) => {
  try {
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

router.put('/:id', tokenExtractor, async (req, res) => {
    try {
      const readingList = await UserBlogs.findByPk(parseInt(req.params.id))
      if (!readingList) return res.status(404).json({error: 'bookmark not found'})
      
      console.log({readingList})
      if (req.decodedToken.id !== readingList.userId) return res.status(403).json({error: "you are not the author"})
      
      if (req.body.read !== true) return res.status(400).json({error: "invalid syntanx for read"})
      
      readingList.read = true
      await readingList.save()

      return res.json(readingList)
  
    } catch(error) {
      return res.status(400).json({ error })
    }
  })

module.exports = router