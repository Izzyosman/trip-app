const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('trip_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Destination = sequelize.define('Destination', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { sequelize, Destination };
