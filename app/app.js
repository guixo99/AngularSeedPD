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
    'ngMaterial',
    Controllers.name,
    Services.name
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app')
      .state('home', {
        url: '/',
        templateUrl: 'modules/home/home.html',
        controller: 'HomeCtrl as home'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/about/about.html',
        controller: 'AboutCtrl as about'
      });
  });