export default class DataService {
  /*@ngInject*/
  constructor($q) {
    this._$q = $q;
  }

  getData() {
    return this._$q.when({
      name: 'Guillermo',
      age: '25'
    });
  }
}
