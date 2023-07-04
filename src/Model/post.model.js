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
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
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

export const PostModel = mongoose.model('Post', PostSchema);