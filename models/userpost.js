const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: { type: String, default: '', maxlength: 1000 },
    date: { type: Date, default: Date.now }
});

let postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { type: String, default: '', trim: true, maxlength: 400 },
    content: { type: String, default: '', trim: true, maxlength: 1000 },
    date: { type: Date, default: Date.now },
    comments: [CommentSchema],
    likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
});

module.exports = mongoose.model('Userpost', postSchema);
