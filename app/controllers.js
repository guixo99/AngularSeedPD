import HomeCtrl from './modules/home/homeCtrl';
import AboutCtrl from './modules/about/aboutCtrl';

var module = angular.module('angularSeedPDApp.controllers', [])
  .controller('MainCtrl', HomeCtrl)
  .controller('AboutCtrl', AboutCtrl);

export default module;
