const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogposts = blogpostData.map((blogpost) => blogpost.get({
            where:{user_id: req.session.user_id}}, { plain: true }));
        res.status(200).json(blogposts);
        res.render('dashboard', {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});