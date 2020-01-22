const { User } = require('../../model/user');

module.exports = async(req, res) => {
    const { message, id } = req.query;
    req.app.locals.asideType = 'user';
    if (id) { // 修改页面
        const user = await User.findOne({ _id: id });

        res.render('admin/user-edit', {
            message,
            user,
            link: 'user-modify?id=' + id
        });
    } else { // 添加页面
        res.render('admin/user-edit', {
            message,
            link: 'user-edit'
        });
    }
};