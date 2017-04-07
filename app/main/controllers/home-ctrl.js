'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $q, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout, $ionicPopup, $cordovaBluetoothLE, ApiService, DataService) {
    var vm = this;
    vm.isFounded = false;
    vm.test = 'dddd';
    vm.value;
    vm.macArray = [];
    vm.beaconsList = [];
    vm.beaconArray = [];
    vm.campaignsArray = [];
    vm.campaignsFinal = [];
    vm.couponsArray = [];
    vm.couponsInLocal = [];
    vm.beaconsLocal = [];
    vm.localRegions = [];
    $ionicPlatform.ready(onReady);
    function onReady () {
      DataService.init();
      init();
    }
    function init () {
      var params = {
        request: true
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
    function bluetoothVerification () {
     /* DataService.getBeacons().then(function (res) {
        for (var i = 0; i < res.rows.length; i++) {
          var obj = JSON.parse(res.rows.item(i).beacon);
          vm.beaconsLocal.push(obj);
        }
        beacon(vm.beaconsLocal);
        setTimeout(function () {
          vm.localRegions.forEach(function (region) {
            $cordovaBeacon.stopRangingBeaconsInRegion(region);
          });
        }, 5000);
        if (vm.beaconsList.length === 0) {
          getToken();
        }
        else {
          processData();
        }
      });*/
      getToken();
    }
    function beacon (array) {
      for (var i in array) {
        var params = {
          identifier: array[i].name,
          uuid: array[i].uuid
        };
        var region = $cordovaBeacon.createBeaconRegion(params.identifier, params.uuid, params.major, params.minor);
        vm.localRegions.push(region);
        $cordovaBeacon.startRangingBeaconsInRegion(region);
      }
      //window.evothings.easyble.startScan(onDeviceFound, onScanError);
    }
    /*function onDeviceFound (device) {
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
    }*/


    //---------------------------------------EVENTS-----------------------------------------------
    $rootScope.$on('$cordovaBeacon:didRangeBeaconsInRegion', function (event, pluginResult) {
      if (pluginResult.beacons.length !== 0) {
        if (vm.beaconsList.length === 0) {
          var aux = pluginResult.beacons.find(function (beacon) {
            return beacon.major === '52209';//sim in prod get  first
          });
          vm.beaconsList.push(aux);
          processData();
        }
        vm.isFounded = true;
      }
    });
    vm.token;
    function getToken () {
      ApiService.getToken()
      .then(onGetTokenSuccess);
    }
    function onGetTokenSuccess (data) {
      var promises = [];
      vm.token = data.access_token;
      promises.push(ApiService.getUUid(vm.token));
      promises.push(ApiService.getCampaign(vm.token));
      promises.push(ApiService.getCoupons(vm.token));
      $q.all(promises)
      .then(onGetPromisesSuccess);
    }
    function onGetPromisesSuccess (data) {
      vm.beaconArray = data[0].beacons.map(function (value) {
        var obj = {
          uuid: value.uuid,
          name: 'estimote',//value.device_name,
          major: value.major,
          minor: value.minor,
          location: value.location
        };
        return obj;
      });
      beacon(vm.beaconArray);
      vm.campaignsArray = data[1].campaigns.map(function (value) {
        var obj = {
          isEnabled: value.enabled,
          name: value.name,
          locations: value.locations,
          contents: value.contents,
          start_time: value.start_time,
          end_time: value.end_time
        };
        return obj;
      });
      vm.couponsArray = data[2].coupons.map(function (value) {
        var obj = {
          name: value.name,
          message: value.message,
          url: value.url
        };
        return obj;
      });
    }
    function processData () {
      var beacon = vm.beaconArray;
      var l;
      for (var a in beacon) {
        if (beacon[a].minor === parseInt(vm.beaconsList[0].minor)) {
          l = beacon[a].location;
          break;
        }
      }
      $log.log(l);
      for (var i in vm.campaignsArray) {
        var element = vm.campaignsArray[i].locations.filter(function (val) {
          if (val.id === l.id) {
            return val;
          }
        });
        if (element.length !== 0 && vm.campaignsArray[i].isEnabled === true) {
          vm.campaignsFinal.push(vm.campaignsArray[i]);
        }
      }
      $log.log('-------------------');
      $log.log(vm.campaignsFinal);
      //------------------------filter campaigns
      for (var j in vm.couponsArray) {
        for (var k in vm.campaignsFinal) {
          for (var m in vm.campaignsFinal[k].contents) {
            var split = vm.campaignsFinal[k].contents[m].name.split('-')[1].trim();
            if (vm.couponsArray[j].name === split) {
              var aux = vm.couponsArray[j];
              aux.start = vm.campaignsFinal[k].start_time;
              aux.end =  vm.campaignsFinal[k].end_time;
              aux.location = l.full_address.split(',')[0];
              vm.couponsInLocal.push(aux);
            }
          }
        }
      }
      //--------------------filter coupons
      //-------------save coupons
      $log.log(vm.couponsInLocal);
      DataService.insertCoupons(vm.couponsInLocal);
    }
  }

})();

