const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./user_blogs')

User.hasMany(Blog)
Blog.belongsTo(User)

// User.sync({alter: true})
// Blog.sync({alter: true})

Blog.belongsToMany(User, {through: UserBlogs, as: 'bookmarked_by'})
User.belongsToMany(Blog, {through: UserBlogs, as: 'reading_lists'})

module.exports = {
  Blog,
  User,
  UserBlogs
}