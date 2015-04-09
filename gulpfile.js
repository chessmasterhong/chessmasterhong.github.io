'use strict';

var gulp = require('gulp'),
    combineMediaQueries = require('gulp-combine-media-queries'),
    concatCSS = require('gulp-concat-css'),
    data = require('gulp-data'),
    del = require('del'),
    fs = require('fs'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    minifyCSS = require('gulp-minify-css'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    requirejs = require('requirejs'),
    runSequence = require('run-sequence'),
    webserver = require('gulp-webserver');


/**
 * Validation
 */
gulp.task('lint-scripts', function() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')))
        .pipe(jshint.reporter('fail'));
});


/**
 * Clean
 */
gulp.task('build:clean', function() {
    return del.sync([
        './index.html',
        './_scripts/',
        './_styles/',
        './_vendor/'
    ]);
});


/**
 * Copy
 */
gulp.task('build:copy-vendors', function() {
    gulp.src('./src/vendor/font-awesome/fonts/**/*')
        .pipe(gulp.dest('./_vendor/font-awesome/fonts/'));
});


/**
 * Compile
 */
gulp.task('build:scripts', ['lint-scripts'], function() {
    requirejs.optimize({
        baseUrl: './src/',
        out: './_scripts/site.js',
        mainConfigFile: './src/scripts/site.js',
        include: [
            './vendor/requirejs/require.js',
            'scripts/site.js'
        ],
        insertRequire: ['scripts/site.js'],
        wrap: true,
        optimize: 'uglify2'
    }, function() {
        return 0;
    }, function(err) {
        console.log(err);
        return 1;
    });
});

gulp.task('build:html', function() {
    return gulp.src('./src/index.jade')
        .pipe(plumber())
        .pipe(data(function(file) {
            return JSON.parse(
                fs.readFileSync(
                    './src/data/' + path.basename(file.path, '.jade') + '.json'
                )
            );
        }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build:styles', function() {
    var autoprefix = new lessPluginAutoPrefix();

    return gulp.src([
            './src/vendor/foundation/css/foundation.css',
            './src/vendor/font-awesome/css/font-awesome.css',
            './src/styles/*.less' // only process root styles directory
        ])
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concatCSS('site.css'))
        .pipe(combineMediaQueries())
        .pipe(replace(/(\/font-awesome\/)/g, '/_vendor$1'))
        .pipe(minifyCSS())
        .pipe(replace(/(.)(\/\*.*)/g, '$1\n\n$2'))
        .pipe(replace(/(\*\/)(.)/g, '$1\n$2'))
        .pipe(gulp.dest('./_styles/'));
});


/**
 * Build
 */
gulp.task('build', function(cb) {
    runSequence(
        'build:clean',
        ['build:scripts', 'build:copy-vendors'],
        ['build:html', 'build:styles'],
        cb
    );
});


/**
 * Webserver
 */
gulp.task('serve', function() {
    gulp.src('./')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080
            //livereload: true
        }));
});


/**
 * Watch
 */
gulp.task('watch', function() {
    gulp.watch([
        './src/**/*.jade',
        './src/**/*.css',
        './src/data/**/*.json'
    ], ['build:html']);

    gulp.watch([
        './src/**/*.less'
    ], ['build:styles']);

    gulp.watch([
        './src/**/*.js'
    ], ['build:scripts']);
});


/**
 * Default
 */
gulp.task('default', function() {
    runSequence('build', 'serve', 'watch');
});
