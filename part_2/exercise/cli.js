require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const DATABASE_URL = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
})

// class Blog extends Model{}

// Blog.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     author: {
//         type: DataTypes.TEXT
//     },
//     url: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     title: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     likes: {
//         type: DataTypes.INTEGER,
//         default: 0
//     }
// }, {
//     sequelize,
//     underscored: true,
//     timestamps: false
// })

const main = async () => {
  try {
    // const blogs = await Blog.findAll()
    const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})
    for (blog of blogs) {
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    }
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()