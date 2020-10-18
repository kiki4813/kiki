const gulp = require("gulp");

const htmlmin = require("gulp-htmlmin");
//1、拷贝.html代码
gulp.task("copy-html", function () {
    return gulp
      .src("*.html")
      .pipe(
        htmlmin({
          removeEmptyAttibutes: true, // 移出所有空属性
          collapseWhitespace: true, // 压缩 html
        })
      )
      .pipe(gulp.dest("dist/"))
      .pipe(connect.reload());
  });

//2、处理图片 imagesmin  对图片再次进行压缩
gulp.task("images", function(){
    return gulp.src("*.{jpg,png,gif}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
  })

//3、处理js文件
gulp.task("scripts", function(){
  return gulp.src(["*.js", "!gulpfile.js"])
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());
 })

//4、处理数据源
gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
 })

//5、处理css样式
const sass = require("gulp-sass");
sass.compiler = require('node-sass');
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("sassIndex", function(){
    return gulp.src("./stylesheet/index.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
  })
gulp.task("sasscommon", function(){
    return gulp.src("./stylesheet/common.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("common.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
  })
  gulp.task("sassdetail", function(){
    return gulp.src("./stylesheet/detail.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("detail.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
  })
  gulp.task("sassshopcar", function(){
    return gulp.src("./stylesheet/shopcar.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("shopcar.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
  })
  gulp.task("sasslogin", function(){
    return gulp.src("./stylesheet/login.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
  })


gulp.task("build", ["copy-html", "images", "scripts", "data", "sassIndex","sasscommon","sassdetail","sassshopcar","sasslogin"]);



//编写监听
gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.{jpg,png}", ["images"]);
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch("./stylesheet/index.scss", ["sassIndex"]);
    gulp.watch("./stylesheet/common.scss", ["sasscommon"]);
    gulp.watch("./stylesheet/detail.scss", ["sassdetail"]);
    gulp.watch("./stylesheet/shopcar.scss", ["sassshopcar"]);
    gulp.watch("./stylesheet/login.scss", ["sasslogin"]);
  })

  const connect = require("gulp-connect");
  gulp.task("server", function(){
    connect.server({
      root: "dist",
      port: 3000,  //0-65535
      livereload: true
    })
  })

//同时启动服务和监听

gulp.task("default", ['watch', 'server']);