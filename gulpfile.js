(function () {
  'use strict';

  // Require gulp library
  var gulp = require("gulp");

  // Require gulp plugins. This autorequire all libraries whose names starting with gulp-* and can be accessed by $.libraryName
  var $ = require('gulp-load-plugins')();

  var browserify = require('browserify');
  var babelify = require('babelify');
  var source = require('vinyl-source-stream');
  var del = require("del");
  var runSequence = require('run-sequence');


  var base = {
    app: 'app/',
    dist: 'dist/'
  };


  var paths = {
    entryApp: base.app + 'app.js',
    scripts: [base.app + '/**/*.js'],
    styles: [base.app + '/**/*.scss'],
    test: ['test/spec/**/*.js'],
    testRequire: [
      '/node_modules/angular/angular.js',
      '/node_modules/angular-mocks/angular-mocks.js',
      '/node_modules/angular-resource/angular-resource.js',
      '/node_modules/angular-cookies/angular-cookies.js',
      '/node_modules/angular-sanitize/angular-sanitize.js',
      '/node_modules/angular-route/angular-route.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    views: {
      main: base.app + '/index.html',
      files: [base.app + '/**/*.html']
    },

    jsBundle: base.dist + 'scripts',

    cssMin: base.dist +'styles/styles.css',
    cssVendor: base.dist +'styles/vendor.css'
  };

  gulp.task('clean:tmp', (cb) => {
    return del(['./.tmp'], cb);
  });

  gulp.task('lint:scripts', function () {

  });

  gulp.task('build', function () {
    return browserify(paths.entryApp, {debug: true})
      .transform(babelify, {sourceMapsAbsolute: true, presets: ['es2015']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(paths.jsBundle));
  });

  gulp.task('start:server', function() {
    $.connect.server({
      root: [base.app, '.tmp', 'bower_components'],
      livereload: true,
      port: 9000
    });
  });




  gulp.task('serve', function (cb) {
    runSequence('clean:tmp',
      ['lint:scripts'],
      ['start:server'],
      cb);
  });
}());