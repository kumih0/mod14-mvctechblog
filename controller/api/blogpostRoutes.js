const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all blogposts 
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
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        res.status(200).json(blogposts);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

//get all blogposts you've created
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        res.status(200).json(blogposts);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


//get blogpost by id, to view specific blogpost
router.get('/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
            include: 
                {
                    model: User,
                    attributes: ['username'],
                },
        });
        const blogpost = blogpostData.get({ plain: true });
        res.status(200).json(blogpost);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


