require('dotenv').config();
const cors = require('cors'); 
const {SERVER_PORT} = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller.js');
const { sequelize } = require('./databases/models.js');

const {seed, addDestination, updateDestination, deleteDestination, getDestinations} = require('./controller.js')

const app = express();
const PORT = 3306;

app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/tropical.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'tropical.png'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.post('/api/vacation', controller.addDestination);
app.put('/api/vacation/:id', controller.updateDestination);
app.delete('/api/vacation/:id', controller.deleteDestination);
app.get('/api/vacation', controller.getDestinations);

app.listen(PORT, async () => {
    console.log(`Server running on PORT:${SERVER_PORT}/`);

    try {
    await sequelize.authenticate();
    console.log('Db connected');
    await sequelize.sync({ alter: true });
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
});
