const sequelize = require('../config/connection');
const userData = require('./userData.json');
const { User, BlogPost, Comment } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
    }

    module.exports = seedDatabase;