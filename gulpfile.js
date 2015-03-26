'use strict';

var gulp = require('gulp'),
    combineMediaQueries = require('gulp-combine-media-queries'),
    data = require('gulp-data'),
    del = require('del'),
    fs = require('fs'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    path = require('path'),
    plumber = require('gulp-plumber'),
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
    return del.sync(['dist/**/*']);
});


/**
 * Copy
 */
gulp.task('build:copy-vendors', function() {
    gulp.src('./src/vendor/foundation/css/foundation.css')
        .pipe(gulp.dest('./dist/vendor/foundation/css/'));

    gulp.src('./src/vendor/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./dist/vendor/font-awesome/css/'));

    gulp.src('./src/vendor/font-awesome/fonts/**/*')
        .pipe(gulp.dest('./dist/vendor/font-awesome/fonts/'));
});


/**
 * Compile
 */
gulp.task('build:scripts', ['lint-scripts'], function() {
    requirejs.optimize({
        baseUrl: './src/',
        out: './dist/scripts/site.js',
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
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:styles', function() {
    var autoprefix = new lessPluginAutoPrefix();

    return gulp.src('./src/styles/*.less') // only process root styles directory
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(combineMediaQueries())
        .pipe(gulp.dest('./dist/styles/'));
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
gulp.task('server', function() {
    gulp.src('./dist/')
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
    runSequence('build', 'server', 'watch');
});
