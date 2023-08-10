const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('', '', '', {
    host: '',
    dialect: ''
});

const Destination = sequelize.define('Destination', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { sequelize, Destination };
