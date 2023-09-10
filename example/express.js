require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const DATABASE_URL = require('./config')
const express = require('express')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class Note extends Model{}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true, // table names will be derived from model names as plural snake case version (eg. Note -> notes, StudyGroup -> study_groups). reference to the columns is also the same as the model 
    timestamps: false, // to not have created_at and updated_at
    modelName: 'note'
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
  console.log(req.body)
  try {
    const note = await Note.create(req.body) // we could also use Note.build(req.body) to create a model object, and note.save() to store it to the database.
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})