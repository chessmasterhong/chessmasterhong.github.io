'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    webserver = require('gulp-webserver');

gulp.task('lint', function() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('default', function() {
    gulp.src('./src/')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true
        }));
});
