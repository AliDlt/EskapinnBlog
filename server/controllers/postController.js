const postService = require('../services/postService');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getPostBySlug = async (req, res) => {
    try {
        const post = await postService.getPostBySlug(req.params.slug);
        if (!post) {
            res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createPost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const post = await postService.createPost(req.body, userId);
        res.status(201).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.slug, req.body);
        if (!post) {
            res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await postService.deletePost(req.params.slug);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};
