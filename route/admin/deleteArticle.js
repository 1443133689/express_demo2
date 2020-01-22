const {Article} = require('../../model/article');

module.exports = async (req, res) =>{
   await Article.findOneAndDelete(req.body.id);
   res.redirect('/admin/article');
};