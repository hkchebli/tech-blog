const router = require('express').Router();
const { User, Blog , Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/new', (req, res) => {
    res.render('new-post');
  });
  
// get all posts
router.get('/', withAuth, (req, res) => {
  Blog.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbPostData => {
    //serialize the data before passing to the template
    const blogs = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { blogs, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get a single post
router.get('/edit/:id', withAuth, (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      //serialize the data
      const blog = dbPostData.get({ plain: true });
      // pass to the template
      res.render('edit-post', {
        blog,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;