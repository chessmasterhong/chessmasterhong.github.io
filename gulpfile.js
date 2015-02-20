'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('default', function() {
    gulp.src('./src/')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true
        }));
});
