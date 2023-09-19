const router = require('express').Router();

const blogRoutes = require('../routes/blogRoutes');
const userRoutes = require('../routes/userRoutes');
const commentRoutes = require('../routes/commentRoutes');

router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
