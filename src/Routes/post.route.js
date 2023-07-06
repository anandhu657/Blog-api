const express = require('express');
const router = express.Router();
const errorResponder = require('../Middleware/error.middleware');
const authenticateToken = require('../Middleware/authentication');
const blogPostController = require('../Controllers/post.controller');
const blogCommentController = require('../Controllers/comment.controller');

// BLOG POST ROUTES
router.post('/', authenticateToken, blogPostController.createBlog);
router.get('/', authenticateToken, blogPostController.getAllBlogPost);
router.put('/', authenticateToken, blogPostController.updateBlogPost);
router.delete('/:id', authenticateToken, blogPostController.deleteBlogPost);
router.get('/:id', authenticateToken, blogPostController.getBlogPostById);

// BLOG POST COMMENTS ROUTES
router.post('/comment', authenticateToken, blogCommentController.addComment);
router.get('/comment/:postId', authenticateToken, blogCommentController.specificBlogComment);

router.use(errorResponder); //MIDDLEWARE FOR HANDLING ERROR

module.exports = router;