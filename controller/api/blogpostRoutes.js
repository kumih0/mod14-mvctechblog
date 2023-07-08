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

//create new blogpost (if logged in)
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

//delete blogpost by id, only if you are the creator of post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.destroy({
                    where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });
            res.status(200).json(`blogpost id ${req.params.id}, ${blogpostData.title}, deleted`)
        if(!blogpostData){
            res.status(404).json({ message: 'No blogpost found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//update/edit blogpost by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.update({
            ...req.body
        },
            {
                where: {
                user_id: req.session.user_id
            }
        })
        if(!blogpostData){
            res.status(404).json({message: 'No blogpost with that id!'})
        }
        res.status(200).json(blogpostData);

    } catch(err) {
        res.status(500).json(err);
    }
});