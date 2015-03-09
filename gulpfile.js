'use strict';

var gulp = require('gulp'),
    data = require('gulp-data'),
    del = require('del'),
    fs = require('fs'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    path = require('path'),
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
    return del.sync(['dist']);
});


/**
 * Copy
 */
gulp.task('build:copy-scripts', function() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('build:copy-vendors', function() {
    return gulp.src('./src/vendor/**/*')
        .pipe(gulp.dest('./dist/vendor/'));
});


/**
 * Compile
 */
gulp.task('build:html', function() {
    return gulp.src('./src/index.jade')
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
        .pipe(gulp.dest('./dist/styles/'));
});


/**
 * Build
 */
gulp.task('build', function(cb) {
    runSequence(
        'lint-scripts',
        'build:clean',
        ['build:copy-scripts', 'build:copy-vendors'],
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
            port: 8080,
            livereload: true
        }));
});


/**
 * Watch
 */
gulp.task('watch', function() {
    gulp.watch(['./src/**/*.jade', './src/data/**/*.json'], ['build:html']);
    gulp.watch('./src/**/*.less', ['build:styles']);
    gulp.watch('./src/**/*.js', ['lint-scripts', 'build:copy-scripts']);
});


/**
 * Default
 */
gulp.task('default', function() {
    runSequence('build', 'server', 'watch');
});
