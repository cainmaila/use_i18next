# How to use i18next (Express4 多語系套件)

### 安裝
以上外掛配合express4使用，安裝套件
```
npm install i18next --save
npm install i18next-node-fs-backend --save
npm install i18next-express-middleware --save
```
**i18next** 多語系主要套件<br>
**i18next-node-fs-backend** 載入語系資料套件<br>
**i18next-express-middlewar** 套版處理與自動語系判定<br>

### 建立多語系檔案
多語系會自動對應各語系的內容，資料夾與內容請一個語系自行規劃
> 請參閱 locales 資料夾結構

### 使用
系統會自動取得瀏覽器目前的語系資料來對應該載入的語系檔案，並套用在版面
```javascript
var express = require('express');
var path = require('path');
var i18next = require('i18next'); //多語系主套件
var FilesystemBackend = require('i18next-node-fs-backend'); //外部載入資料套件
var middleware = require('i18next-express-middleware'); //i18next middleware 套件
var app = express();
i18next
    .use(middleware.LanguageDetector) //自動偵測系統語系
    .use(FilesystemBackend) //加掛可以外部載入套件 backend
    .init({
            // lng: 'en', //也不用先預設了，網頁呼叫時才會抓
            fallbackLng: "en_x", //!重要，備用語系，抓不到就會用這裡
            backend: {
                loadPath: "locales/{{lng}}/translation.json",
            }
        },
        function(err, t) { //語系載入後呼叫
            var hw = i18next.t('til'); //嘗試取til看看
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
```
請參閱 app3.js


### 參考文
[i18next API](http://i18next.com/)
