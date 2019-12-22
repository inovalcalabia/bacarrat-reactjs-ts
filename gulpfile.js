"use strict";

var gulp = require("gulp");
var typescript = require("typescript");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var del = require("del");

var webserver = require('gulp-webserver');
var concat = require("gulp-concat");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var concatCss = require("gulp-concat-css");
var babelify = require("babelify");
var inject = require("gulp-inject");
var project = ts.createProject("src/tsconfig.json", { typescript: typescript });
var removeCode = require('gulp-remove-code');
var runSequence = require('run-sequence');
var options = {};

gulp.task("through", function() {
  return gulp
    .src(["src/index.html", "public/favicon.ico", "public/manifest.json"])
    .pipe(gulp.dest("dist"));
});

gulp.task("copy-asset", function() {
  return gulp.src(["public/assets/**/*"]).pipe(gulp.dest("dist/assets"));
});

gulp.task("css", function() {
  gulp
    .src("src/**/*.css")
    .pipe(minifyCSS())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("dist"));
});

gulp.task("compile", function() {
  var result = gulp.src("src/**/*{ts,tsx}").pipe(removeCode({ gulpmode: false })).pipe(ts(project));
  return result.js.pipe(gulp.dest(".tmp"));
});




gulp.task("html", function() {
  var target = gulp.src("./public/index.html");
  var sources = gulp.src(["./dist/**/*.js", "./dist/**/*.css"], {
    read: false
  });

  return target
    .pipe(inject(sources, { addRootSlash: true, ignorePath: "/dist" }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("clean", function(done) {
  del([".tmp"], done.bind(this));
});

gulp.task(
  "bundle",
  ["through", "css", "compile", "copy-asset"],
  function() {
    var b = browserify([".tmp/index.js"]).transform("babelify", {
      presets: ["@babel/preset-env"]
    });
    return b
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("dist"));
  }
);

gulp.task('build', function(callback) {
  runSequence('bundle', 'html',
              callback);
});

gulp.task("watch", ["build"], function() {
  gulp.watch("src/**/*", ["build"]);
});

gulp.task('serve', ['build'], function () {
  return gulp.src("./dist")
    .pipe(webserver({
      port: 3001,
      livereload: true
    }));
});

gulp.task('serve-watch', ['watch'], function () {
  return gulp.src("./dist")
    .pipe(webserver({
      port: 3001,
      livereload: true
    }));
});
