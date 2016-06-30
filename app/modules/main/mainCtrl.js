'use strict';

import DataService from '../../services/dataService';

/**
 * @name angularSeedPDApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularSeedPDApp
 */
export default class MainCtrl {
  /*@ngInject*/
  constructor($scope, DataService) {
    var self = this;

    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    DataService.getData().then(function (d) {
      self.data = d;
    });
  }
}
