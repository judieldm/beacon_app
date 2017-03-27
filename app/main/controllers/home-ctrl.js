'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout) {
    var vm = this;
    vm.isFounded = false;
    $timeout(function () {
      vm.isFounded = true;
      $log.log(vm.isFounded);
    }, 500);
    /*--------------------------------------*/
    $ionicPlatform.ready(onReady);
    function onReady () {
      if (window.cordova) {
        $cordovaBeacon.isBluetoothEnabled()
        .then(function (boolean) {
          $log.log(boolean);
        });
      }
    }

  }

})();

