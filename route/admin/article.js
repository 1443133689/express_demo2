const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    req.app.locals.asideType = 'article';
    const { page } = req.query;
    const articles = await pagination(Article).find({}).populate('author').page(page).size(5).display(3).exec();
    res.render('admin/article', {
        articles
    });
}