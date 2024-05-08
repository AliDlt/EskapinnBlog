const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/api/posts')
    .get(postController.getAllPosts)
    .post(authMiddleware.authenticate, authMiddleware.authorize, postController.createPost);

router
    .route('/api/posts/:slug')
    .get(postController.getPostBySlug)
    .patch(authMiddleware.authenticate, authMiddleware.authorize, postController.updatePost)
    .delete(authMiddleware.authenticate, authMiddleware.authorize, postController.deletePost);

module.exports = router;
