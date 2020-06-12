var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
//fileinclude功能
var fileinclude = require('gulp-file-include');
//browserSync的功能
var browserSync = require('browser-sync').create();
//browserSync 修正後重整功能
var reload = browserSync.reload;

//全域安裝gulp-cli  gulp3.9.1 npm i gulp-cli -g  
//專案安專  npm i gulp3.9.1 (node版本使用11.1)//用gulp4會錯誤
//安裝 npm i gulp-clean-css --save-dev
//安裝  npm install --save-dev gulp-concat
//安裝 npm install node-sass gulp-sass --save-dev
//安裝 npm i browser-sync --save-dev
//安裝 npm install --save-dev gulp-file-include

gulp.task('hello',function(){
    //do
    console.log('hello world!');
});


gulp.task('moveHtml',function(){
    //src 來源 
    return gulp.src('./dev/*.html')
    //pipe 透過管道 dest 目的地
    .pipe(gulp.dest('dest/'))
})

// gulp.task('moveCss',function(){
//     //src 來源 
//     return gulp.src('css/*.css')
//     //pipe 透過管道 dest 目的地
//     .pipe(gulp.dest('dest/css'))
// })

//壓縮Css  gulp-clean-css
// gulp.task('miniCss',function(){
//     //src 來源 
//     return gulp.src('css/*.css')
//     //壓縮
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     //pipe 透過管道 dest 目的地
//     .pipe(gulp.dest('dest/css/min'))
// })

//concat 合併
// gulp.task('concatCss',function(){
//     //src 來源 
//     return gulp.src('css/*.css')
//     //合併
//     .pipe(concat('all.css'))
//     //pipe 透過管道 dest 目的地
//     .pipe(gulp.dest('dest/css'))
// })

//合併+壓縮
// gulp.task('concatMiniCss',function(){
//     //src 來源 
//     return gulp.src('css/*.css')
//     //合併
//     .pipe(concat('all.css'))
//     //壓縮
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     //pipe 透過管道 dest 目的地
//     .pipe(gulp.dest('dest/css/min'))
//})

//SASS功能
gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'));
    });

//SASS轉譯 + 合併 + 壓縮 O
// gulp.task('sassConcatMiniCss',['sass'],function(){
//     //src 來源 
//     return gulp.src('css/*.css')
//     //合併
//     .pipe(concat('all.css'))
//     //壓縮
//    // .pipe(cleanCSS({compatibility: 'ie8'}))
//     //pipe 透過管道 dest 目的地
//     .pipe(gulp.dest('dest/css/min'))
// })

//監看
gulp.task('watch',function(){
    //watch(所監看的目錄途徑,偵測到變更後所使用的方法)
    gulp.watch('./dev/sass/*.scss',['sass']);
    gulp.watch('./dev/*.html',['moveHtml']);

})

//HTML模板 O
gulp.task('fileinclude', function() {
    gulp.src(['./dev/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./dest'));
});


//browser-Sync(小型的阿帕契)  設定default 就可以直接在終端機中使用 gulp 執行 O
gulp.task('default',function(){
    browserSync.init({
        server:{
            baseDir:"./dest",
            index: "index.html"
        }
    });
    gulp.watch('./sass/*.scss',['sass']).on('change',reload);
    gulp.watch(['./dev/*.html','./dev/**/*.html'],['fileinclude']).on('change',reload);
})