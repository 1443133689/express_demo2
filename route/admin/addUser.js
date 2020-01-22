const { User, validateData } = require('../../model/user');
const hashCode = require('../../model/hashCode');

module.exports = async function(req, res, next) {
    try {
        await validateData(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return next(JSON.stringify({
                path: '/admin/user-edit',
                message: '邮箱名已被注册'
            }));
        }
        req.body.password = await hashCode(req.body.password);
        await User.create(req.body);
        return res.redirect('/admin/user');
    } catch (err) {
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: err.message
        }))
        // return res.redirect(`/admin/user-edit?message=${err.message}`);
    }
};