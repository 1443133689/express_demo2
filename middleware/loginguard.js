module.exports = (req, res, next) => {
    if (req.url != '/login' && !req.session.username) {
        return res.redirect('/admin/login');
    } else if (req.url !='/login' && req.session.role === 'normal') {
         res.status(303).render('admin/login',{
            message:'访问该页面需要先登录管理员账号'
        });
    } else {
        next();
    }
}