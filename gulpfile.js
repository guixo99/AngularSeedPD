(function () {
  'use strict';

  var gulp = require("gulp");
  var babel = require("gulp-babel");
  var sourcemaps = require("gulp-sourcemaps");
  var browserify = require('browserify');
  var babelify = require('babelify');
  var source = require('vinyl-source-stream');


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

  gulp.task('build', function () {
    return browserify(paths.entryApp, {debug: true})
      .transform(babelify, {sourceMapsAbsolute: true, presets: ["es2015"]})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(paths.jsBundle));
  });
}());