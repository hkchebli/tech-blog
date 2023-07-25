const express = require('express');
const { Blog } = require('../models');

const blogController = {
    // Get all blog posts
    getAllBlogs: async (req, res) => {
        try {
            const blogData = await Blog.findAll();
            res.status(200).json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single blog post
    getBlogById: async (req, res) => {
        try {
            const blogData = await Blog.findByPk(req.params.id);
            if (!blogData) {
                res.status(404).json({ message: 'No blog found with that id!' });
                return;
            }
            res.status(200).json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new blog post
    createBlog: async (req, res) => {
        try {
            const newBlog = await Blog.create({
                title: req.body.title,
                content: req.body.content,
                userId: req.session.userId
            });
            res.status(200).json(newBlog);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Update a blog post
    updateBlog: async (req, res) => {
        try {
            const blogData = await Blog.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            if (!blogData) {
                res.status(404).json({ message: 'No blog found with that id!' });
                return;
            }
            res.status(200).json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a blog post
    deleteBlog: async (req, res) => {
        try {
            const blogData = await Blog.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!blogData) {
                res.status(404).json({ message: 'No blog found with that id!' });
                return;
            }
            res.status(200).json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = blogController;
