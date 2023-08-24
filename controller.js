require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        },
    }
});

// Add the authentication check here
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Country = sequelize.define("Country", {
    country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const seed = async (req, res) => {
    try {
        await sequelize.sync({ force: true }); 
        await Country.bulkCreate([
            { name: 'Maldives' },
            { name: 'Bahamas' },
            { name: 'Bora Bora' },
            { name: 'Mauritius' },
            { name: 'Bali' },
            { name: 'Fiji' },
            { name: 'Seychelles' },
            { name: 'Hawaii' },
            { name: 'Santorini' },
            { name: 'Phuket' }
        ]);
        console.log("Data seeded.");
        res.sendStatus(200);
    } catch (error) {
        console.error("Error during seeding:", error);
        res.status(500).send(error.message);
    }
};

const addCountry = async (req, res) => {
    try {
        const country = await Country.create({ name: req.body.name });
        res.json(country);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getCountry = async (req, res) => {
    try {
        const country = await Country.findAll();
        res.json(country);
    } catch (error) {
        console.error("Error fetching country:", error); // This line will print detailed error info.
        res.status(500).send(error.message);
    }
};


const updateCountry = async (req, res) => {
    try {
        await Country.update({ name: req.body.name }, { where: { country_id: req.params.id } });
        res.json({ message: "Country updated" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteCountry = async (req, res) => {
    try {
        await Country.destroy({ where: { country_id: req.params.id } });
        res.json({ message: "Country deleted" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    seed,
    addCountry,
    getCountry,
    updateCountry,
    deleteCountry
};