'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout, $ionicPopup, $cordovaBluetoothLE) {
    var vm = this;
    vm.isFounded = false;
    vm.test = 'dddd';
    vm.value;
    $timeout(function () {
      vm.isFounded = true;
      $log.log(vm.test);
    }, 500);
    /*--------------------------------------*/
    $ionicPlatform.ready(onReady);
    function onReady () {
      if (window.cordova) {
        init();
      }
    }
    function init () {
      var params = {
        request: true,
        //restoreKey: "bluetooth-test-app"
      };
      $cordovaBluetoothLE.initialize(params).then(null, function () {
        $ionicPopup.alert({
          title: 'error',
          template: 'error'
        });
      }, function (obj) {
        $ionicPopup.alert({
          title: 'test',
          template: JSON.stringify(obj)
        }).then(function () {
          scan();
        });
      });
    }
    function scan () {
      var params = {
        services: [],
        allowDuplicates: false,
      };
      params.callbackType = 2;
      $cordovaBluetoothLE.startScan(params).then(function (obj) {
        $ionicPopup.alert({
          title: 'stop',
          template: 'stop' + JSON.stringify(obj)
        });
      }, function (obj) {
        $ionicPopup.alert({
          title: 'error',
          template: '' + JSON.stringify(obj)
        });
      }, function (obj) {
        if (obj.status === 'scanResult') {
          add(obj);
          $cordovaBluetoothLE.stopScan().then(function (obj) {
            $ionicPopup.alert({
              title: 'stoped',
              template: '' + JSON.stringify(obj)
            })
            .then(function () {
              $ionicPopup.alert({
                title: 'final',
                template: JSON.stringify(vm.value)
              });
            });
          });
        }
      });
    }
    function add (val) {
      vm.value = val;
      var params = {address: vm.value.address, timeout: 10000};
      $cordovaBluetoothLE.connect(params)
      .then(null, function (obj) {
        $ionicPopup.alert({
          title: 'error Conecting',
          template: JSON.stringify(obj)
        });
      }, function (obj) {
        $ionicPopup.alert({
          title: 'connected',
          template: JSON.stringify(obj)
        });
        discover(vm.value.address);
      });
    }
    function discover (address) {
      var params = {
        address: address,
        timeout: 10000
      };
      $cordovaBluetoothLE.discover(params).then(function (obj) {
        $ionicPopup.alert({
          title: 'discover',
          template: JSON.stringify(obj)
        });
      }, function (obj) {
        $ionicPopup.alert({
          title: 'error',
          template: JSON.stringify(obj)
        });
      });
    }
   /* function bluetoothVerification (boolean) {
      if (!boolean) {
        showPopUp();
      }
    }
    function showPopUp () {
      var options = {
        title: 'Bluetooth',
        template: 'Debes activar el bluetooth',
        cancelText: 'Ajustes',
        okText: 'Ok'
      };
      $ionicPopup.confirm(options)
      .then(function (res) {
        if (res) {
          //show message
        } else { //got to settings or enable
          var response = $cordovaBeacon.enableBluetooth();
          response.then(function () {});
        }
      });
    }*/
  }

})();

