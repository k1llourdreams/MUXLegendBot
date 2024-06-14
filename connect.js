const Sequelize = require('sequelize');
const info = require('./config.json')

const sequelize = new Sequelize(info.database, info.name, info.password, {
    host: info.host,
    dialect: 'mysql',
    logging: false,
});


const accounts = require('./accounts')(sequelize, Sequelize.DataTypes);

module.exports = { accounts }