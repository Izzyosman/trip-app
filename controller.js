const { Destination } = require('./database/models.js');

exports.addDestination = async (req, res) => {
    try {
        const destination = await Destination.create({ name: req.body.destination });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        await Destination.update({ name: req.body.destination }, { where: { id: req.params.id } });
        res.json({ message: "Destination updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDestination = async (req, res) => {
    try {
        await Destination.destroy({ where: { id: req.params.id } });
        res.json({ message: "Destination deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
