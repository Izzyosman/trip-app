const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller');
const { sequelize } = require('./database/models');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.post('/api/vacation', controller.addDestination);
app.put('/api/vacation/:id', controller.updateDestination);
app.delete('/api/vacation/:id', controller.deleteDestination);
app.get('/api/vacation', controller.getDestinations);

app.listen(PORT, async () => {
    console.log(`Server running on PORT:${PORT}/`);

    await sequelize.authenticate();
    console.log('Db connected');
    await sequelize.sync({ alter: true });
});