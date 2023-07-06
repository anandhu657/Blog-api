const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comments'
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PostModel = mongoose.model('posts', PostSchema);

module.exports = PostModel;