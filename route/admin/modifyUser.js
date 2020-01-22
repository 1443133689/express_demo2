const { User, validateData } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async function(req, res, next) {
    const { username, password, email, role, status } = req.body;
    const id = req.query.id
    const user = await User.findOne({ _id: id });
    try {
        const confirmPsw = await bcrypt.compare(password, user.password);
        if (!confirmPsw) {
            throw new Error('请输入正确的密码');
        }
        const validateOthers = await validateData(req.body);
        await User.updateOne({ _id: id }, { username, email, role, status });
        return res.redirect('/admin/user');
    } catch (err) {
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: err.message,
            id
        }))
    }
}