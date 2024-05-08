const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    meta: String,
    keywords: [String],
    shortDescription: {
        type: String,
        required: true
    },
    image: String,
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate slug from title
postSchema.pre('save', async function(next) {
    if (!this.slug || this.isModified('title')) {
        let slug = slugify(this.title, { lower: true, replacement: '-' });
        let count = 0;
        let post;
        do {
            if (count > 0) {
                slug = `${slug}-${count}`;
            }
            post = await this.constructor.findOne({ slug });
            count++;
        } while (post);
        this.slug = slug;
    }
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
