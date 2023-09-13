const Blog = require('./blog')

// Blog.truncate()
Blog.sync()

module.exports = {
  Blog
}