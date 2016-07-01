import HomeCtrl from './HomeCtrl';

var module = angular.module('angularSeedPDApp.home', [
    'ui.router'
  ])
  //Routes
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        parent: 'abstract-app',
        url: 'home',
        templateUrl: './modules/home/home.html',
        controller: 'HomeCtrl as home'
      });
  })

  //Services

  //Controllers
  .controller('HomeCtrl', HomeCtrl);

export default module;
