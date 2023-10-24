const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./user_blogs')
const Session = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)

// User.belongsTo(Session)
Session.belongsTo(User)

// User.sync({alter: true})
// Blog.sync({alter: true})

Blog.belongsToMany(User, {through: UserBlogs, as: 'bookmarked_by'})
User.belongsToMany(Blog, {through: UserBlogs, as: 'reading_lists'})

module.exports = {
  Blog,
  User,
  UserBlogs,
  Session
}