var config = require('../config'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    cssNano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    watchLess = require('gulp-watch-less'),
    cssBase64 = require('gulp-css-base64');

var build = function(buildOnly)
{
    return ( buildOnly  ? gulp.src(config.less.source)
        : watchLess(config.less.source) )
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssBase64({
            baseDir: './src/assets/less/',
            maxWeightResource: 32,
            extensionsAllowed: ['.svg']
        }))
        .pipe(autoprefixer({
            browsers: config.autoprefixer.browsers
        }))
        .pipe(rename(config.less.filename))
        .pipe(gulp.dest(config.less.dest))
        .pipe(cssNano())
        .pipe(rename(config.less.filename.replace(/\.css$/,'.min.css')))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.less.dest));
}

gulp.task('less',function(){
    return build(true);
});

gulp.task('less-watch',['less'],function(){
    return build();
});

module.exports = {
    build: 'less',
    watch: 'less-watch'
};