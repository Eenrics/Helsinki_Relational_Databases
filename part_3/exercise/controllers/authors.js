const router = require('express').Router()
require('express-async-errors')
const { Blog } = require('../models')
const {Op} = require('sequelize')
const {sequelize} = require('../utils/db')

router.get('/', async (req, res) => {

    const blogs = await Blog.findAll({
        attributes: [
          'author',
          [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
          [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        group: 'author',
        order: [
            ['likes', 'DESC']
          ]
      });
  res.json(blogs)
})

module.exports = router