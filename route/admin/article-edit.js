const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    req.app.locals.asideType = 'article';
    const { id } = req.query;
    if (id) {
        const article = await Article.findOne({ _id: id });
        res.render('admin/article-edit', {
            article,
            link: 'article-modify?id=' + id
        });
    } else {
        res.render('admin/article-edit', { link: 'article-edit' });
    }
};