const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.parse(req, async function(err, fields, files) {
        if (err) {
            return next(err);
        }
        const cover = files.cover.path.split('public')[1];
        // fields.publish = fields.publish ? fields.publish : Date.now();
        const article = Object.assign({}, fields, { cover });
        await Article.create(article);
    });
    return res.redirect('/admin/article');
}