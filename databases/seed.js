const { sequelize, Destination } = require('./models');

const destinations = ["Cabo", "St Lucia", "St Tropez", "Tahiti"];

async function seedDatabase() {
    try {
        for (const destination of destinations) {
            await Destination.create({ name: destination });
        }
        console.log('Database seeded');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Connect to the database and seed
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        seedDatabase();
    });
