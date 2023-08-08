const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await BlogPost.bulkCreate(blogpostData, { include: { model: User } });

    await Comment.bulkCreate(commentData, { include: { model: User, BlogPost } });

    process.exit(0);
}

seedDatabase();