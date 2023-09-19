// routes/index.js
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const loginRoutes = require('./loginRoute');
const signupRoutes = require('./signupRoute');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/users', loginRoutes);
router.use('/users', signupRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
