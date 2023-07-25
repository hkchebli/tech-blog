// routes/blogRoutes.js
const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all blogs for homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [User],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single blog post
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [User],
        });

        if (blogData) {
            const blog = blogData.get({ plain: true });

            res.render('blog', { blog });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
