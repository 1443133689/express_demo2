module.exports = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('blog');
        return res.redirect('/admin/login');
    })
};
