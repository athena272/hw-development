'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

const paths = {
    scss: {
        src: './assets/scss/main.scss',
        dest: './assets/css',
        dest_min: './assets/dist/css',
        watch: './assets/scss/**/*.scss'
    },
    js: {
        src: './assets/js/main.js',
        dest: './assets/dist/js',
        watch: './assets/js/**/*.js'
    }
};

function compileScss() {
    return gulp.src(paths.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(minifyCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(paths.scss.dest_min));
}

function minifyJs() {
    return gulp.src(paths.js.src)
        .pipe(terser())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.js.dest));
}

function watchFiles() {
    gulp.watch(paths.scss.watch, compileScss);
    gulp.watch(paths.js.watch, minifyJs);
}

const build = gulp.parallel(compileScss, minifyJs);
const watch = watchFiles;

exports.build = build;
exports.watch = watch;
exports.default = build; 