const sequelize = require('../config/connection');
const userData = require('./userData.json');
const blogpostData = require('./blogData.json');
const { User, BlogPost, Comment } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await BlogPost.bulkCreate(blogpostData, {include: {model: User}});

    await Comment.bulkCreate(commentData, {include: {model: User, BlogPost}});

    process.exit(0);
    }

    module.exports = seedDatabase;