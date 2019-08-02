const gulp = require('gulp');
const gls = require('gulp-live-server');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const vueify = require('vueify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const config = require('./config');

const bundleJS = () => {
    return browserify({
        basedir: '.',
        debug: config.debug,
        entries: ['vue/main.js'],
        transform: [vueify],
        cache: {},
        packageCache: {}
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
}

const bundleCSS = () => {
    return gulp.src('./vue/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public'));
}

const copyHTML = () => {
    return gulp.src('./vue/*.html')
        .pipe(gulp.dest('public'));
}

const sync = (cb) => {
    browserSync.reload();
    cb();
}

const watch = (cb) => {
    gulp.watch(['./vue/**/*.js'], gulp.series(bundleJS, sync));
    gulp.watch(['./vue/**/*.vue'], gulp.series(bundleJS, sync));
    gulp.watch(['./vue/styles/**/*.scss'], gulp.series(bundleCSS, sync));
    gulp.watch(['./vue/*.html'], gulp.series(copyHTML, sync));
    cb();
}

const serve = (cb) => {
    const liveServer = gls.new('server.js');
    liveServer.start();
    browserSync.init({
        proxy: config.host + ':' + config.PORT
    });
    cb();
}

exports.build = gulp.series(copyHTML, bundleJS, bundleCSS);
exports.default = gulp.series(serve, copyHTML, bundleJS, bundleCSS, watch);