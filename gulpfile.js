(function () {
  'use strict';

  // Require gulp library
  var gulp = require("gulp");

  // Require gulp plugins. This autorequire all libraries whose names starting with gulp-* and can be accessed by $.libraryName
  var $ = require('gulp-load-plugins')();

  var mainBowerFiles = require('main-bower-files');
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

    jsBundles: base.dist + 'scripts',
    cssBundles: base.dist +'styles',

    cssMin: base.dist +'styles/styles.css'
  };

  gulp.task('clean:tmp', (cb) => {
    return del(['./.tmp'], cb);
  });

  gulp.task('clean:dist', (cb) => {
    return del(['./dist/**/*.*', '/dist'], cb);
  });

  gulp.task('clean', ['clean:tmp', 'clean:dist']);

  gulp.task('lint:scripts', function () {

  });

  gulp.task('start:server', function() {
    $.connect.server({
      root: [base.dist],
      livereload: true,
      port: 9000
    });
  });

  gulp.task('build:compileJs', function () {
    return browserify(paths.entryApp, {debug: true})
      .transform(babelify, {sourceMapsAbsolute: true, presets: ['es2015']})
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.jsBundles));
  });

  gulp.task('build:compileCss', function () {
    return gulp.src(base.app + '**/*.scss')
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.concat('styles.css'))
      .pipe(gulp.dest(paths.cssBundles));
  });

  gulp.task('build:vendorJs', function() {
    gulp.src(mainBowerFiles({
        overrides: {
          lodash: {
            main: './lodash.js'
          }
        },
        filter: '**/*.js'
      }))
      .pipe($.concat('vendor.js'))
      .pipe(gulp.dest(paths.jsBundles));
  });

  gulp.task('build:vendorCss', function() {
    gulp.src(mainBowerFiles({
        filter: '**/*.css'
      }))
      .pipe($.concat('vendor.css'))
      .pipe(gulp.dest(paths.cssBundles));
  });

  gulp.task('copy:extras', function () {
    return gulp.src(base.app + '*.html', { dot: true })
      .pipe(gulp.dest(base.dist));
  });

  gulp.task('serve', function (cb) {
    runSequence('clean:tmp',
      ['lint:scripts'],
      ['start:server'],
      cb);
  });

  gulp.task('build', function () {
    runSequence([
      'clean',
      'build:compileJs',
      'build:compileCss',
      'build:vendorJs',
      'build:vendorCss',
      'copy:extras'
    ]);
  });
}());