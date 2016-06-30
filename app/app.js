'use strict';

/**
 * @ngdoc overview
 * @name PD
 * @description
 * # PD
 *
 * Main module of the application.
 */

angular
  .module('angularSeedPDApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/about/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });
  });