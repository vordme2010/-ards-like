'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const bulk = require('gulp-sass-bulk-importer');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');

function compileStyles () {
    return gulp.src('src/scss/**/*.scss')
    .pipe(bulk())
    .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        browsers: [
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 11',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function compileScript () {
    return gulp.src('./src/script/**/*.js')
    .pipe(minify({noSource: true}))
    .pipe(uglify({toplevel: true}))
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function compressImages () {
    return gulp.src('src/img/**/*')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/img'))
}

gulp.task('cleanAll', function () {
  return gulp.src('dist/*', {read: false})
      .pipe(clean());
});


gulp.task('dev-watcher', function() {
  browserSync.init({
      server: "./"
  });
  gulp.watch("src/**/*.js", compileScript);
  gulp.watch("src/**/*.scss", compileStyles);
  gulp.watch("index.html").on('change', browserSync.reload);
});

exports.compileSass = compileStyles;
exports.compileJs = compileScript;
exports.imgCompress = compressImages;

exports.build = gulp.series('cleanAll', gulp.parallel(this.imgCompress, this.compileSass, this.compileJs))
exports.dev = gulp.series(gulp.parallel(this.imgCompress, this.compileSass, this.compileJs), 'dev-watcher')