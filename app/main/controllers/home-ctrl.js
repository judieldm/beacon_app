'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout, $ionicPopup, $cordovaBluetoothLE, ApiService) {
    var vm = this;
    vm.isFounded = false;
    vm.test = 'dddd';
    vm.value;
    vm.macArray = [];
    vm.beaconsList = [];
    vm .token;
    function getToken () {
      ApiService.getToken()
      .then(onGetTokenSuccess);
    }
    function onGetTokenSuccess (data) {
      $log.log(data);
      $ionicPopup.alert({
        title: 'sdf',
        template: JSON.stringify(data)
      });
    }
    getToken();
  }

})();

