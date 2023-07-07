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

//use withAuth middleware to prevent access to route, dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get other user profile page
router.get('/profile/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });
        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;