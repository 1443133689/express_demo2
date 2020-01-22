const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const hashCode = require('./hashCode');

mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

// hashCode('123456')
//     .then(password => {
//         User.create({
//             username: 'phx',
//             email: '1443133689@qq.com',
//             password,
//             role: 'admin'
//         });
//     }).catch(err => console.log(err));

// 等价于(async function(){const psw = await hashCode('123456')})();User.create()... ...

const rules = {
    username: Joi.string().regex(/[\u4e00-\u9fa5-a-z0-9_]{2,12}/i).required().error(new Error('用户名不符合规则')),
    email: Joi.string().required().email().error(new Error('邮箱格式不符合要求')),
    password: Joi.string().regex(/[a-z0-9]{6,30}/i).required().error(new Error('密码格式不符合规则')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不符合要求')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
};

function validateData(user) {
    return Joi.validate(user, rules);
}

module.exports = {
    User,
    validateData
};