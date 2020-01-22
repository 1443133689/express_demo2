const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    await Comment.create(req.body);
    res.redirect('/article?id=' + req.query.id);
}