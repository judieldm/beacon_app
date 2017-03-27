'use strict';
(function () {

  angular.module('main')
  .controller('ListCtrl', listCtrl);

  function listCtrl ($log, $cordovaInAppBrowser, $ionicPlatform, DataService) {
    var vm = this;
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
    vm.delete = onDelete;
    vm.open = onOpen;
    $log.log(DataService);
    DataService.init();
    function onOpen (item) {
      $log.log(item);
      $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options);
    }
    function onDelete (item) {
      $log.log(item);
    }

  }
})();
