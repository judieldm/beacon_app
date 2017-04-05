'use strict';
(function () {
  angular.module('main')
  .service('DataService', dataService);
  function dataService ($log, $cordovaSQLite, $q) {
    var vm = this;
    var isAndroid = ionic.Platform.isAndroid();
    var process = onProcess;
    vm.selectCoupons = onSelectCoupons;
    vm.insertCoupons = onInsertCoupons;
    vm.insertBeacon = onInsertBeacon;
    vm.getBeacons = onGetBeacons;
    function onProcess (query, params) {
      var db;
      var defered = $q.defer();
      var promise = defered.promise;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          if (params === undefined) {
            $cordovaSQLite.execute(db, query).then(function (res) {
              defered.resolve(res);
            });
          } else {
            params.forEach(function (val) {
              $cordovaSQLite.execute(db, query, [JSON.stringify(val), false]).then(function (res) {
                defered.resolve(res);
              });
            });
          }
        }
      }
      return promise;
    }
    function onSelectCoupons () {
      var query = 'SELECT * FROM COUPONS';
      var promise = process(query);
      return promise;
    }
    function onInsertCoupons (couponsArray) {
      var query = 'INSERT INTO COUPONS (coupon, isVisited) VALUES (?,?)';
      var promise = process(query, couponsArray);
      return promise;
    }
    function onInsertBeacon (beacons) {
      var array = angular.isArray(beacons) ? beacons : [].push(beacons);
      var query = 'CREATE TABLE IF NOT EXISTS BEACONS (id integer autoincrement, beacon text, isUSed boolean);INSERT INTO BEACONS (beacon,isUsed) VALUES (?,?)';
      var promise = process(query, array);
      return promise;
    }
    function onGetBeacons () {
      var query = 'SELECT * FROM BEACONS';
      var promise = process(query);
      return promise;
    }
  }
})();
