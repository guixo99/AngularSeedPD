import DataService from './services/dataService';

var module = angular.module('angularSeedPDApp.services', [])
  .service('DataService', DataService);

export default module;