const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    publish: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: [String, 'content出现错误'],
    cover: [String, 'cover出现错误']
});
const Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
};