'use strict';

var gulp = require('gulp'),
    data = require('gulp-data'),
    del = require('del'),
    fs = require('fs'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    path = require('path'),
    preprocess = require('gulp-preprocess'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell'),
    webserver = require('gulp-webserver');


/**
 * Validation
 */
gulp.task('scripts-lint', function() {
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
gulp.task('build:scripts-copy', function() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('build:vendor-copy', function() {
    return gulp.src('./src/vendor/**/*')
        .pipe(gulp.dest('./dist/vendor/'));
});


/**
 * Compile
 */
gulp.task('build:html-jade', function() {
    return gulp.src('./src/index.jade')
        .pipe(data(function(file) {
            return require(
                './src/data/' + path.basename(file.path, '.jade') + '.json'
            );
        }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(preprocess())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:styles-less', function() {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/styles/'));
});


/**
 * Build
 */
gulp.task('build', function(cb) {
    runSequence(
        'scripts-lint',
        'build:clean',
        ['build:scripts-copy', 'build:vendor-copy'],
        ['build:html-jade', 'build:styles-less'],
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
        }));
});
