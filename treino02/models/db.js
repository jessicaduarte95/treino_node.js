// Conexão com o banco de dados MySQL

const Sequelize = require('sequelize')
const sequelize = new Sequelize('formulario', 'root', 'password',{
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}