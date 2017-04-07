'use strict';
(function () {
  angular.module('main')
  .service('DataService', dataService);
  function dataService ($log, $cordovaSQLite, $q) {
    var vm = this;
      var isAndroid = ionic.Platform.isAndroid();
    vm.init = onInit;
    vm.selectCoupons = onSelectCoupons;
    vm.insertCoupons = onInsertCoupons;
    vm.selectBeacons = onSelectBeacons;
    vm.insertBeacon = onInsertBeacon;
    vm.delete = onDelete;
    function onDelete () {
       var db;
      var defered = $q.defer();
      var promise = defered.promise;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          $cordovaSQLite.execute(db, 'DELETE FROM COUPONS').then(function (res) {
            defered.resolve(res);
          });
        }
      }
      return promise;
    }
    function onInit () {
      var db;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          var query = 'CREATE TABLE IF NOT EXISTS COUPONS (id INTEGER PRIMARY KEY AUTOINCREMENT, coupon text ,isVisited boolean); CREATE TABLE IF NOT EXISTS BEACONS (id integer autoincrement, beacon text)';
          $cordovaSQLite.execute(db, query).then(function (res) {
            $log.log(res);
          });
        }
      } else {
        db = window.openDatabase('my.db', '1', 'my', 1024 * 1024 * 100);
      }
    }
    function onSelectCoupons () {
      var db;
      var defered = $q.defer();
      var promise = defered.promise;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          var query = 'SELECT * FROM COUPONS';
          $cordovaSQLite.execute(db, query).then(function (res) {
            defered.resolve(res);
          });
        }
      }
      return promise;
    }
    function onInsertCoupons (couponsArray) {
      var db;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          couponsArray.forEach(function (val) {
            var query = 'INSERT INTO COUPONS (coupon, isVisited) VALUES (?,?)';
            $cordovaSQLite.execute(db, query, [JSON.stringify(val), false]).then(function (res) {
              $log.log(res);
            });
          });
        }
      }
    }
    function onSelectBeacons () {
      var db;
      var defered = $q.defer();
      var promise = defered.promise;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          var query = 'SELECT * FROM BEACONS';
          $cordovaSQLite.execute(db, query).then(function (res) {
            defered.resolve(res);
          });
        }
      }
      return promise;
    }
    function onInsertBeacon (beaconsArray) {
       var db;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          beaconsArray.forEach(function (val) {
            var query = 'INSERT INTO BEACONS (beacon) VALUES (?)';
            $cordovaSQLite.execute(db, query, [JSON.stringify(val), false]).then(function (res) {
              $log.log(res);
            });
          });
        }
      }
    }
  }
})();
