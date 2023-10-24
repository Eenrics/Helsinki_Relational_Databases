const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: 'users', key: 'id' },
      // },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    })
    await queryInterface.addColumn('sessions', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' }
    })
    // await queryInterface.addColumn('users', 'session_id', {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: { model: 'sessions', key: 'id' }
    // })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions')
    await queryInterface.removeColumn('sessions', 'session_id')
  },
}