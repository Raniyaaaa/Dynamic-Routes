const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_complete', 'root', 'Raniya@2002', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize;