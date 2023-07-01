const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

//one user has many blog posts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//one blog post belongs to one user
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

//one user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//one comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//one blog post has many comments
BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});

//one comment belongs to one blog post
Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id'
});

module.exports = { User, BlogPost, Comment };