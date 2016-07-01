'use strict';

/**
 * @ngdoc overview
 * @name PD
 * @description
 * # PD
 *
 * Main module of the application.
 */

import AppModule from './modules/app/module'

import HomeModule from './modules/home/module';
import AboutModule from './modules/about/module';
import SharedModule from './modules/shared/module';

angular
  .module('angularSeedPDApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    AppModule.name,
    HomeModule.name,
    AboutModule.name,
    SharedModule.name
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('abstract-app', {
        url: '/',
        abstract: true,
        template: '<div ui-view></div>',
        controller: 'AppCtrl as app'
      });
  });