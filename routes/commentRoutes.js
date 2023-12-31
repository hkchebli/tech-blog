// routes/commentRoutes.js
const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all comments for a blog
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                blogId: req.params.id,
            },
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('comments', { comments });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
