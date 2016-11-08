'use strict';

var watchify = require('watchify'),
  browserify = require('browserify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  assign = require('lodash.assign'),
  notify = require('gulp-notify'),
  del = require('del');

var customOpts = {
  entries: ['./src/app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

b.transform('babelify', {extensions: ['.js', '.jsx', '.json']});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('js', ['clean'], bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(notify('Finished updating javascript'))
    .pipe(gulp.dest('./dist'));
}