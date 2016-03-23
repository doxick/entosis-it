var gulp = require('gulp'),
    config = require('../config'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    stringify = require('stringify'),
    eventStream = require('event-stream'),
    logger = require("eazy-logger").Logger({
        prefix: "[{blue:JS}] "
    });

var bundle = function (bundler, filename) {
    logger.info('Bundling \'{yellow:%s}\'',filename);
    var bundle = bundler.bundle()
        .pipe(source(filename))
        .pipe(buffer())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.browserify.dest));
    if (config.environment == 'production')
    {
        return bundle.pipe(rename({extname: '.min.js'}))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.browserify.dest));
    }
    return bundle;
};

var build = function(callback, watchCallback){
    var hasWatch = !!watchCallback;
    var tasks = config.browserify.sources.map(function(file){
        var filename = file.split('/').pop();
        var bundler = browserify({
            entries: file,
            plugin: hasWatch ? [watchify] : undefined
        });
        bundler
            .transform(stringify(['.html']))
            .transform(babelify, {
                presets: config.babelify.presets,
                plugins: config.babelify.plugins,
                ignore: /(bower_components)|(node_modules)/
            });
        if (hasWatch)
        {
            bundler.on('update',function() {
                bundle(bundler, file).on('end', watchCallback);
            });
            bundler.on('log',function(msg){
                logger.info("{yellow:%s}: %s", filename, msg);
            });
        }
        return bundle(bundler,file);
    });
    if (hasWatch)
        eventStream.merge(tasks);
    eventStream.merge(tasks).on('end',callback);
};


gulp.task('browserify', function(done) {
    return build(done);
});

gulp.task('browserify-watch',function(done){
    return build(done, function() {});
});

module.exports = {
    build: 'browserify',
    watch: 'browserify-watch'
};