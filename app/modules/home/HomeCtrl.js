'use strict';

import DataService from '../shared/DataService';

/**
 * @name angularSeedPDApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularSeedPDApp
 */
export default class HomeCtrl {
  /*@ngInject*/
  constructor(DataService) {
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
