var express = require('express');
var path = require('path');
var i18next = require('i18next');
var FilesystemBackend = require('i18next-node-fs-backend');
var middleware = require('i18next-express-middleware'); //i18next middleware 套件
var app = express();
i18next
    .use(middleware.LanguageDetector) //自動偵測系統語系
    .use(FilesystemBackend) //加掛可以外部載入套件 backend
    .init({
            // lng: 'en', //也不用先預設了，網頁呼叫時才會抓
            fallbackLng: "en_x", //備用語系，抓不到就會用這裡
            backend: {
                loadPath: "locales/{{lng}}/translation.json",
            }
        },
        function(err, t) {
            var hw = i18next.t('til');
            console.log(hw);
        });

app.use(middleware.handle(i18next, {
    // removeLngFromUrl: false
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get("/", function(req, res) {
    console.log(req.language); //取得目前語系 ,抓瀏覽器語系，小心對應的資料夾
    console.log(req.languages);
    res.render('app2', {
        title: 'Hey',
        //有裝i18next-express-middleware，jade裡只要下t(key)就會置換
        //div=t('til')
    });
})
app.listen(80, function() {
    console.log("go go 80 port!!");
})
