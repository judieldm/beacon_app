'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout, $ionicPopup) {
    var vm = this;
    vm.isFounded = false;
    vm.test = 'dddd';
    vm.value;
    /*--------------------------------------*/
    $ionicPlatform.ready(onReady);
    function onReady () {
      if (window.cordova) {
        $cordovaBeacon.isBluetoothEnabled()
        .then(bluetoothVerification);
      }
    }
   /* function init () {
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
    }*/
    function bluetoothVerification (boolean) {
      if (!boolean) {
        showPopUp();
      }
      else {
        init();
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
          response.then(function () {
            init();
          });
        }
      });
    }
    function init () {
      var params = {
        identifier: 'iBeacon', //Onyx beacon
        uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d', //id Onyx
        major: 52209,
        minor: 34627
      };
      var region = $cordovaBeacon.createBeaconRegion(params.identifier, params.uuid, params.major, params.minor);
      $cordovaBeacon.startMonitoringForRegion(region)
      .then(monitoring, failed);
    }
    function monitoring (res) {
      vm.isFounded = true;
      $ionicPopup.alert({
        title: 'object',
        template: JSON.stringify(res)
      });
    }
    function failed (res) {
      $ionicPopup.alert({
        title: 'fails',
        template: JSON.stringify(res)
      });
    }
    $rootScope.$on('$cordovaBeacon:peripheralManagerDidStartAdvertising', function (event, pluginResult) {
      $ionicPopup.alert({
        title: 'ad',
        template: JSON.stringify(pluginResult)
      });
    });
    $rootScope.$on('$cordovaBeacon:didRangeBeaconsInRegion', function (event, pluginResult) {
      $ionicPopup.alert({
        title: 'ad',
        template: JSON.stringify(pluginResult)
      });
    });
  }

})();

