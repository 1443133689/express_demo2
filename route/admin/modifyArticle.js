const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    const { id } = req.query;
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.parse(req, async function(err, fields, files) {
        if (err) {
            return next(err);
        }
        let article = {};
        if (files.cover.size != 0) {
            const cover = files.cover.path.split('public')[1];
            article = Object.assign({}, fields, { cover });
        } else {
            article = Object.assign({}, fields);
        }
        await Article.updateOne({ _id: id }, article);
        return res.redirect('/admin/article');
    });
}