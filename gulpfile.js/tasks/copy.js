var gulp = require('gulp'),
    config = require('../config'),
    eventStream = require('event-stream'),
    watch = require('gulp-watch');

var build = function(buildOnly, callback)
{
    var tasks = Object.keys(config.copy.sources).map((source)=>{
        return (buildOnly   ? gulp.src(source)
            : watch(source) )
            .pipe(gulp.dest(config.copy.sources[source]));
    });
    eventStream.merge(tasks).on('end',callback);
}
gulp.task('copy',function(done){
    return build(true, done);
});

gulp.task('copy-watch',['copy'],function(done){
    return build(false, done);
});

module.exports = {
    build: 'copy',
    watch: 'copy-watch'
};