const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    aid: {
        type: mongoose.Types.ObjectId,
        ref: 'Article'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 999
    }
});

const Comment = mongoose.model('Comment', commentSchema);

// comment.create({
//     uid: '5e1c628b9c45bd378cad6b5c',
//     aid: '5e25179af0dd7b2a847d1cb6',
//     content: '哈哈哈哈哈'
// });

module.exports = {
    Comment
};