var express = require('express');
var path = require('path');
var i18next = require('i18next');
var FilesystemBackend = require('i18next-node-fs-backend'); //外部載入資料套件
var app = express();
i18next
    .use(FilesystemBackend) //加掛可以外部載入套件 backend
    .init({
        lng: 'en',
        backend: { //i18next-node-fs-backend設定
            loadPath: "locales/{{lng}}/translation.json",   //json的字串都需引號包覆，
            //不然會解析錯誤讀不到
            // allowMultiLoading: false
        }
    }, function(err, t) {
        var hw = i18next.t('til'); // hw = 'hello world'
        console.log(hw);
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get("/", function(req, res) {
    res.render('index', {
        title: 'Hey',
        message: i18next.t('til')
    });
})
app.listen(80, function() {
    console.log("go go 80 port!!");
})
