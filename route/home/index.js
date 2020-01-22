const express = require('express');
const router = express.Router();

router.get('/', require('./home'));
router.get('/article', require('./article'));
router.post('/article', require('./addComment'));
module.exports = router;