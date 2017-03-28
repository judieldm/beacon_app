'use strict';
(function () {
  angular.module('main')
  .service('DataService', dataService);
  function dataService ($log, $cordovaSQLite) {
    var vm = this;
    var isAndroid = ionic.Platform.isAndroid();
    vm.init = onInit;
    function onInit () {
      var db;
      if (window.cordova) {
        if (isAndroid) {
          db = $cordovaSQLite.openDB({ name: 'my.db', bgType: 1, iosDatabaseLocation: 'default' });
          var query = 'CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)';
          $cordovaSQLite.execute(db, query).then(function (res) {
            $log.log(res);
          });
        }
      } else {
        db = window.openDatabase('my.db', '1', 'my', 1024 * 1024 * 100);
      }
    }
  }

})();