var argv = require('yargs').argv;
module.exports = {
    environment: argv.production ? 'production' : 'development', // 'development' or 'production'
    browserify: {
        sources: ['./client/Assets/js/main.js'],
        dest: './static/Assets/js/'
    },
    babelify: {
        presets: ['es2015'] // change to es2015-loose if you want ie9 support
    },
    less: {
        source: './client/Assets/less/main.less',
        dest: './static/Assets/css',
        filename: 'style.css'
    },
    autoprefixer: {
        browsers: ['> 1%'] // add IE 9 if you want ie9 support
    },
    images: {
        source: './client/Assets/images/**/*.{jpg,jpeg,svg,gif,png}',
        dest: './static/Assets/images/'
    },
    copy: {
        sources: {
            './client/Assets/fonts/**/*.*': './static/Assets/fonts/'
        }
    }
};
