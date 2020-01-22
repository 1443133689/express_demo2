const express = require('express');
const app = express();
const router = express.Router();

router.get('/login', require('./login'));

router.get('/logout', require('./logout'));

router.get('/user', require('./user'));

router.post('/login', require('./getUser'));

router.get('/user-edit', require('./user-edit'));

router.post('/user-edit', require('./addUser'));

router.post('/user-modify', require('./modifyUser'));

router.get('/user-delete', require('./deleteUser'));

router.get('/article', require('./article'));

router.get('/article-edit', require('./article-edit'));

router.post('/article-edit', require('./addArticle'));

router.post('/article-delete', require('./deleteArticle'));

router.post('/article-modify', require('./modifyArticle'));
module.exports = router;