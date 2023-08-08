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
                {
                    model: Comment,
                }
            ],
        });
        for(const blogpost of blogpostData) {
            const totalComments = await Comment.findAndCountAll({
                where: {
                    blogpost_id: blogpost.id,
                },
            });
            blogpost.dataValues.totalComments = totalComments.count;
        }
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        // res.status(200).json(blogposts);

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

//logout route
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
            console.log('logged out');
        });
    } else {
        res.redirect('/');
    }
});

//get all blogposts
router.get('/blogposts', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                },
            ],
        });
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        res.render('blogposts', {
            ...blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get blogpost by id, to view specific blogpost
router.get('/blogpost/:id', async (req, res) => {
    try { 
        const blogpostData = await BlogPost.findByPk(req.params.id, { //finding the blogpost by id
            include: [//super nested join object, by doing a nested join, the users as both blogposter and commenters are included and easily distinguished
                {//includes username of poster
                    model: User,
                    attributes: ['username'],
                },
                {//includes comments of that post
                    model: Comment,
                    include: {//which then includes all the usernames of the commenters
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
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
            include: [{ model: BlogPost }, {model: Comment}],
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
            include: [{ model: BlogPost }, {model: Comment}],
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