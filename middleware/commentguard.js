module.exports = (req, res, next) => {
    const { id } = req.query;
    if (req.path == '/article' && req.method == 'POST' && !req.session.username) {
        console.log(req.session.username);
        return res.redirect('/article?status=loginout&id=' + id);
    } else {
        next();
    }
}