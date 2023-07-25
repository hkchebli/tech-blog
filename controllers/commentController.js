const { Comment } = require('../models');

const commentController = {
    // Create a new comment
    createComment: async (req, res) => {
        try {
            const newComment = await Comment.create({
                comment_text: req.body.comment_text,
                user_id: req.session.userId,
                blog_id: req.body.blog_id
            });
            res.status(200).json(newComment);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get all comments for a blog post
    getCommentsByBlogId: async (req, res) => {
        try {
            const commentsData = await Comment.findAll({ 
                where: { 
                    blog_id: req.params.id 
                }
            });
            res.status(200).json(commentsData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a comment
    deleteComment: async (req, res) => {
        try {
            const commentData = await Comment.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.userId
                }
            });
            if (!commentData) {
                res.status(404).json({ message: 'No comment found with that id!' });
                return;
            }
            res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = commentController;
