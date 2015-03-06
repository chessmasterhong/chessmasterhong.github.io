'use strict';

var gulp = require('gulp'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    preprocess = require('gulp-preprocess'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell'),
    webserver = require('gulp-webserver');

gulp.task('lint', function() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('build:styles', function() {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('build:html-generate', shell.task('node ./tasks/generate-portfolio.js'));

gulp.task('build:html-process', function() {
    return gulp.src('./dist/index.html')
        .pipe(preprocess())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:copy', function() {
    return gulp.src('./src/{scripts,styles,vendor}/**/*')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:clean', function() {
    return del.sync(['dist']);
});

gulp.task('build', function(cb) {
    runSequence(
        'build:clean',
        'lint',
        'build:copy',
        ['build:html-generate', 'build:styles'],
        'build:html-process',
        cb
    );
});

gulp.task('default', function() {
    gulp.src('./dist/')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080
            //livereload: true
        }));
});
