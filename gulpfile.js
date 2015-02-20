'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('default', function() {
    gulp.src('./src/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});
