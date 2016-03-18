var gulp = require('gulp'),
    config = require('../config'),
    changed    = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');

var build = function(buildOnly)
{
    return (buildOnly   ? gulp.src(config.images.source)
        : watch(config.images.source) )
        .pipe(changed(config.images.dest))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(config.images.dest));
}

gulp.task('images', function() {
    return build(true);
});
gulp.task('images-watch',['images'],function(){
    return build();
})

module.exports = {
    build: 'images',
    watch: 'images-watch'
}