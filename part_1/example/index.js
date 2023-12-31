require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const DATABASE_URL = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    console.log(notes)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()