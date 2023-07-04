const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get homepage route
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
        // res.status(200).json(blogposts);
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get blogpost by id, to view specific blogpost
router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
            include: 
                {
                    model: User,
                    attributes: ['username'],
                },
        });
        const blogpost = blogpostData.get({ plain: true });
        res.render('blogpost', {
            ...blogpost,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//

module.exports = router;