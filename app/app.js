'use strict';

/**
 * @ngdoc overview
 * @name PD
 * @description
 * # PD
 *
 * Main module of the application.
 */

import Controllers from './controllers'
import Services from './services'

angular
  .module('angularSeedPDApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    Controllers.name,
    Services.name
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/main/main.html',
        controller: 'MainCtrl as main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/about/about.html',
        controller: 'AboutCtrl as about'
      });
  });