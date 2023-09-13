const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Note extends Model {}

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
  // /*** THIS IS OPTIONAL AS SEQUELIZE ITSELF CREATES FOR US (BECAUSE WE SPECIFIED ONE TO MANY RELATION IN INDEX PAGE). THIS IS UNNECESSARY ***/
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: { model: 'users', key: 'id' },
  // },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

module.exports = Note