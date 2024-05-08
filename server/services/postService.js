const Post = require('../models/postModel');

exports.getAllPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getPostBySlug = async (slug) => {
    try {
        const post = await Post.findOne({ slug });
        return post;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.createPost = async (postData, userId) => {
    try {
        const post = await Post.create({ ...postData, author: userId });
        return post;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.updatePost = async (slug, newData) => {
    try {
        const post = await Post.findOneAndUpdate({ slug }, newData, {
            new: true,
            runValidators: true
        });

        return post;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.deletePost = async (slug) => {
    try {
        await Post.findOneAndDelete({ slug });
    } catch (err) {
        throw new Error(err.message);
    }
};
