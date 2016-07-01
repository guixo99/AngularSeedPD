import AboutCtrl from './AboutCtrl';

var module = angular.module('angularSeedPDApp.about', [
    'ui.router'
  ])
  //Routes
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        parent: 'abstract-app',
        url: 'about',
        templateUrl: './modules/about/about.html',
        controller: 'AboutCtrl as about'
      });
  })

  //Services

  //Controllers
  .controller('AboutCtrl', AboutCtrl);

export default module;