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
    views: {
      main: base.app + '/index.html',
      files: [base.app + '/**/*.html']
    },
    bower: ['bower.json'],

    jsBundles: base.dist + 'scripts',
    cssBundles: base.dist +'styles',

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
    ]
  };

  /**
   * Clean tasks
   */
  gulp.task('clean:tmp', (cb) => {
    return del(['./.tmp'], cb);
  });

  gulp.task('clean:dist', (cb) => {
    return del(['./dist/**/*.*', '/dist'], cb);
  });

  gulp.task('clean', ['clean:tmp', 'clean:dist']);


  /**
   * Build tasks
   */
  gulp.task('build:compile:js', function () {
    return browserify(paths.entryApp, {debug: true, fullPaths: true})
      .transform(babelify, {sourceMapsAbsolute: true, presets: ['es2015']})
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.jsBundles));
  });

  gulp.task('build:compile:css', function () {
    return gulp.src(paths.styles)
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.concat('styles.css'))
      .pipe(gulp.dest(paths.cssBundles));
  });

  gulp.task('build:vendor:js', function() {
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

  gulp.task('build:vendor:css', function() {
    gulp.src(mainBowerFiles({
        filter: '**/*.css'
      }))
      .pipe($.concat('vendor.css'))
      .pipe(gulp.dest(paths.cssBundles));
  });

  gulp.task('build:html', function () {
    return gulp.src(base.app + '**/*.html').
      pipe(gulp.dest(base.dist));
  });


  /**
   * Watch tasks
   */
  gulp.task('watch', function (cb) {
    gulp.watch(paths.scripts, function () {
      runSequence(
        'build:compile:js',
        'serve:reload'
      );
    });

    gulp.watch(paths.styles, function() {
      runSequence(
        'build:compile:css',
        'serve:reload'
      );
    });

    gulp.watch(paths.views.files, function() {
      runSequence(
        'build:html',
        'serve:reload'
      );
    });

    gulp.watch(paths.bower, function() {
      runSequence(
        'build:vendor:js',
        'build:vendor:css',
        'serve:reload'
      );
    });
  });


  /**
   * Server tasks
   */
  gulp.task('serve:reload', function () {
    return gulp.src(paths.entryApp)
      .pipe($.connect.reload());
  });

  gulp.task('server:start', function() {
    $.connect.server({
      root: [base.dist],
      livereload: true,
      port: 9000
    });
  });

  gulp.task('serve', function (cb) {
    runSequence('clean:tmp',
      ['server:start'],
      'watch', cb);
  });


  /**
   * Build task
   */
  gulp.task('build', function () {
    runSequence([
      'clean',
      'build:compile:js',
      'build:compile:css',
      'build:html',
      'build:vendor:js',
      'build:vendor:css'
    ]);
  });
}());