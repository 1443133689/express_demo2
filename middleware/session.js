const session = require('express-session');

module.exports = session({
    secret: 'phxblog',
    name: 'blog',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
});
