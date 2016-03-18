var gulp = require('gulp'),
    browserify = require('./tasks/browserify'),
    less = require('./tasks/less'),
    images = require('./tasks/images'),
    copy = require('./tasks/copy'),
    config = require('./config');

gulp.task('default',['build']);
gulp.task('build',[
    browserify.build,
    less.build,
    images.build,
    copy.build
]);
gulp.task('watch',[
    browserify.watch,
    less.watch,
    images.watch,
    copy.watch
]);