import MainCtrl from './modules/main/mainCtrl';
import AboutCtrl from './modules/about/aboutCtrl';

var module = angular.module('angularSeedPDApp.controllers', [])
  .controller('MainCtrl', MainCtrl)
  .controller('AboutCtrl', AboutCtrl);

export default module;
