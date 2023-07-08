const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const { findByPk } = require('../../models/user');
const withAuth = require('../../utils/auth');

//get all comments route
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: BlogPost,
                    attributes: ['title'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        const allComments = commentData.map((comment) => comment.get({plain: true}));
        res.status(200).json(allComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all comments by user id
router.get('/user/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where:{
                user_id: req.params.id
            },
            include: {
                model: BlogPost,
                attributes: ['title, created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            },
        });
        if(!commentData){
            res.status(404).json({message: `No comments found by user ${req.params.id}`})
        }
        const allUserComments = commentData.map((comment) => comment.get({plain: true}));
        res.status(200).json(allUserComments);
    } catch(err){
        res.status(500).json(err);
    }
});

//get all comments for specific blogpost by id
router.get('/blogpost/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                blogpost_id: req.params.id,
            },
            include: {
                model: User,
                attributes: ['username']
            },
        });
        if (!commentData) {
            res.status(404).json({ message: `No comments found for blogpost ${req.params.id}` });
        };
        const allBlogpostComments = commentData.map((comment) => comment.get({plain: true}));
        res.status(200).json(allBlogpostComments);
    } catch (err) {
        res.status(500).json(err);
    };
});

//create new comment on blogpost
router.post('/blogpost/:id', withAuth, async (req, res) => {
    try{
        const commentData = req.body.trim();
        if (!commentData) {
            res.status(400).json(`No comment detected, can't post to blogpost ${req.params.id}`);
        };

        const newComment = await Comment.create({
            comment: commentData,
            user_id: req.session.user_id,
            blogpost_id: req.params.id, 
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get comment by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk( req.params.id, {
            include: {
                model: BlogPost,
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        });
        if(!commentData){
            res.status(404).json({message: 'No comment found w that id dummy'});
        };
        res.status(200).json(commentData);
    } catch (err){
        res.status(500).json(err);
    };
});



//delete comment
