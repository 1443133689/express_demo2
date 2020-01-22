const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/session'));
require('./model/connect');
// 引入模板引擎
const artTemplate = require('express-art-template');
app.engine('art', artTemplate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.locals.dateformat = require('date-format');
// 设置根路由
app.use('/',require('./middleware/commentguard'));
app.use('/', require('./route/home'));
app.use('/admin', require('./middleware/loginguard'));
app.use('/admin', require('./route/admin'));

app.use((err, req, res, next) => {
    console.log(err.message);
    
    const data = JSON.parse(err);
    const arr = [];
    for(item in data) {
        if(item!= 'path') {
            arr.push(`${item}=${data[item]}`);
        }
    }
    res.redirect(`${data.path}?` + arr.join('&'));
});

app.listen(80);
console.log('服务启动成功');