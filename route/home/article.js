const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    const article = await Article.findOne({ _id: req.query.id }).populate('author');
    const comments = await Comment.find({}).populate('uid');
    res.render('home/article', { article, comments });
}