const gulp = require('gulp'), // Main Gulp module
    concat = require('gulp-concat'), // Gulp File concatenation plugin
    open = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'), // Gulp Web server runner plugin
    gws = require('gulp-ws'),
    portfinder = require('portfinder');

const app = require('./src/app');
// process.chdir('./app/');

// Configuration
var configuration = {
    localServer: {
        port: 8001,
        url: 'http://localhost:8001/'
    }
};

// Gulp task to create a web server
gulp.task('connect', function () {
    connect.server({
        root: 'generator',
        port: configuration.localServer.port,
    }).h;
});

// Gulp task to open the default web browser
gulp.task('open', function () {
    gulp.src('generator/index.html')
        .pipe(open());
});


gulp.task('ws', function () {
    return gulp.src('src/*')
        .pipe(gws({ host: 'ws://localhost/' }))
        .pipe(gulp.dest('src/'));
});

// Gulp default task
gulp.task('default', gulp.series(['ws', 'open',]));


// const { letterAtOneToUpperCase, writeFile, pathToFolder } = require('./utils/utils');
// const { createFormBuilderModel } = require('./models-types/class.model')
// const { createComponentLogic } = require('./create-component/create-typescript')
// const { createComponentTemplate } = require('./create-component/create-template');



