const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (email.trim().length == 0 || password.trim().length == 0) {
        res.render('admin/error', {
            msg: '邮箱或密码错误'
        });
    }
    if (user) {
        const r = await bcrypt.compare(password, user.password);
        if (r) {
            req.app.locals.userInfo = user;
            req.session.username = user.username;
            req.session.role = user.role;
            if (req.session.role === 'admin') {
                return res.redirect('/admin/user');
            } else {
                return res.redirect('/');
            }
        } else {
            res.render('admin/error', {
                msg: '邮箱或密码错误'
            });
        }
    }
};