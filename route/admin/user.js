const { User } = require('../../model/user');


const pageLength = 2;

module.exports = async(req, res, next) => {
    const total = await User.countDocuments();
    const totalPage = Math.ceil(total / pageLength);
    const curPage = req.query.page || 1;
    try {
        const users = await User.find({}).skip((curPage - 1) * pageLength).limit(pageLength);
        const usersCount = await User.countDocuments();
        req.app.locals.asideType = 'user';
        res.render('admin/user', {
            users,
            usersCount,
            curPage,
            totalPage
        });
    } catch (e) {
        next(e);
    }
};