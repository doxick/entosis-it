var gulp = require('gulp'),
    config = require('../config'),
    watch = require('gulp-watch');

var build = function(buildOnly)
{
    return (buildOnly   ? gulp.src(config.html.source)
        : watch(config.html.source) )
        .pipe(gulp.dest(config.html.dest));
}
gulp.task('html',function(){
    return build(true);
    ;
});

gulp.task('html-watch',['html'],function(){
    return build();
});

module.exports = {
    build: 'html',
    watch: 'html-watch'
};