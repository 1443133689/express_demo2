const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    const { page } = req.query;
    const articles = await pagination(Article).find({}).populate('author').page(page).size(6).display(5).exec();
    res.render('home/default', { articles });
}