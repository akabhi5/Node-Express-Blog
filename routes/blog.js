const router = require('express').Router();
const { allBlogs, newBlog, getOneBlog } = require('../controllers/blog');
const verify = require('./verifyToken');


router.get('/', allBlogs);
router.get('/:id', getOneBlog);
router.post('/', verify, newBlog);


module.exports = router;