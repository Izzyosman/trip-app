require('dotenv').config();
const cors = require('cors'); 
const PORT = process.env.SERVER_PORT || 5432;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {
  seed,
  addCountry,
  updateCountry,
  deleteCountry,
  getCountry,
} = require('./controller.js');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, 'style.css')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));
app.get('/tropical.png', (req, res) => res.sendFile(path.join(__dirname, 'tropical.png')));

// API routes
app.post('/api/vacation/:id', addCountry);
app.get('/api/vacation/:id', getCountry);
app.put('/api/vacation/:id', updateCountry);
app.delete('/api/vacation/:id', deleteCountry);

// DEV
app.post('/seed', seed);

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}/`);
});