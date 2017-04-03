'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout, $ionicPopup, $cordovaBluetoothLE) {
    var vm = this;
    vm.isFounded = false;
    vm.test = 'dddd';
    vm.value;
    vm.macArray = [];
    vm.beaconsList = [];
    /*--------------------------------------*/
    $ionicPlatform.ready(onReady);
    function onReady () {
      if (window.cordova) {
        /*$cordovaBeacon.isBluetoothEnabled()
        .then(bluetoothVerification);*/
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
      }, function () {
        $cordovaBeacon.isBluetoothEnabled()
        .then(bluetoothVerification);
      });
    }
    /*function scan () {
      window.evothings.easyble.startScan(onDeviceFound, onScanError);
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
    function onDeviceFound (device) {
     // var val = $cordovaBluetoothLE.encodedStringToBytes(device.scanRecord);
      var check = vm.macArray.indexOf(device.address);
      if (check === -1) {
         $cordovaBluetoothLE.connect({address: device.address, timeout: 500})
         .then(null, cnnError, cnnOk);
        vm.macArray.push(device.address);
      }
      var byteStr = '';
      for (var i = 0; i < val.length; i++) {
        var byte = val[i].toString(16);
        if (byte.length === 1) {
          byte = '0' + byte;
        }
        byteStr += byte;
      }
    }
    function onScanError (err) {
      $ionicPopup.alert({
        title: 'nop',
        template: '' + JSON.stringify(err)
      });
    }
    function cnnError (res) {
      $log.log(res);
    }
    function cnnOk (resp) {
      $log.log(resp);
    }*/
    /*function add (value) {
      vm.value = value;
     // var params = {address: vm.value.address, timeout: 10000};
      var val = $cordovaBluetoothLE.encodedStringToBytes(value.advertisement);
      //var byteStr = '';
      $ionicPopup.alert({
        title: 'value',
        template: val
      });
      for (var i = 0; i < val.length; i++) {
        var byte = val[i].toString(16);
        if (byte.length === 1) {
          byte = '0' + byte;
        }
        byteStr += byte;
      }
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
    }*/
    /*function discover (address) {
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
        //showPopUp();
      }
      else {
        init2();
      }
    }
    /*
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

          });
        }
      });
    }*/

    function init2 () {
      var params = {
        identifier: 'Estimote', //Onyx beacon
        uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d', //id Onyx
      };
      var region = $cordovaBeacon.createBeaconRegion(params.identifier, params.uuid);
      $cordovaBeacon.startMonitoringForRegion(region)
      .then(monitoring, failed);
      $cordovaBeacon.startRangingBeaconsInRegion(region)
      .then(rating);
      $cordovaBeacon.isAdvertisingAvailable()
      .then(adCheck);
      window.evothings.easyble.startScan(onDeviceFound, onScanError);
    }
    function onDeviceFound (device) {
      vm.isFounded = true;
      if (vm.macArray.indexOf(device.address) === -1) {
        vm.macArray.push(device.address);
      }
    }
    function onScanError (err) {
      $log.log(err);
    }
    function adCheck (result) {
      $log.log(result);
    }
    function rating (res) {
      $log.log(res);
    }
    function monitoring () {
      vm.isFounded = true;
    }
    function failed (res) {
      $ionicPopup.alert({
        title: 'fails',
        template: JSON.stringify(res)
      });
    }
    //---------------------------------------EVENTS-----------------------------------------------
    $rootScope.$on('$cordovaBeacon:didRangeBeaconsInRegion', function (event, pluginResult) {
      if (pluginResult.beacons.length !== 0) {
        vm.isFounded = true;
        vm.beaconsList = pluginResult.beacons;
      }
    });
    $rootScope.$on('$cordovaBeacon:didStartMonitoringForRegion', function (event, pluginResult) {
      $log.log(pluginResult);
    });
  }

})();

