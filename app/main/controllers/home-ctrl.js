'use strict';
(function () {

  angular.module('main')
  .controller('HomeCtrl', homeCtrl);

  function homeCtrl ($log, $q, $rootScope, $ionicPlatform, $cordovaBeacon, $timeout, $ionicPopup, $cordovaBluetoothLE, ApiService, DataService, $state) {
    var vm = this;
    vm.isFounded = false;
    vm.isFounded2 = false;
    vm.notBlue=false;
    vm.test = 'dddd';
    vm.goList = onGo;
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
    function onGo () {
      $state.go('beacon.list');
    }
    $ionicPlatform.ready(onReady);
    function onReady () {
      DataService.init();
      DataService.delete();
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
      beacon();
    }
    function beacon () {
        var params = {
          identifier: 'estimote',
          uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
        };
        var region = $cordovaBeacon.createBeaconRegion(params.identifier, params.uuid);
        $cordovaBeacon.startRangingBeaconsInRegion(region);
    }



    //---------------------------------------EVENTS-----------------------------------------------
    $rootScope.$on('$cordovaBeacon:didRangeBeaconsInRegion', function (event, pluginResult) {
      if (pluginResult.beacons.length !== 0) {
        if (vm.beaconsList.length === 0) {
          $log.log(pluginResult);
          vm.beaconsList =pluginResult.beacons;
          processData();
        }

      }
    });
 
    function processData () {
       var array=[];
         var promises = [];
      ApiService.getDevices().then(function(res){
        for(var i in vm.beaconsList){
        var device = res.filter(function(data){
          return parseInt(vm.beaconsList[i].major) == data.settings.advertisers.ibeacon[0].major
        });
         $log.log(device[0]);
      
        promises.push(ApiService.getLink(device[0].identifier));
            
      }
      $log.log(promises);
        $q.all(promises).then(function(res){
          $log.log(res);
          for(var j in res){
            var links = res[j].data.here_and_now.current_links
            for(var i in links){
              var coupon = {
                url: links[i].url,
                title: links[i].title,
                description: links[i].description
              }
              array.push(coupon);
            }
          }
            DataService.insertCoupons(array);
            vm.coupons = array;
            vm.isFounded = true; 
            setTimeout(function () {
                vm.isFounded2= true;
            }, 1000);
          });
     
      });
      
    }
    //-----------------------------------------

    vm.delete = onDelete;
    vm.open = onOpen;
   
    function onOpen (item) {
      $log.log(item);
      $state.go('beacon.find', {'url': item});
    }
    function onDelete (item) {
      vm.coupons.splice(item, 1);
      $log.log(vm.coupons);
      $log.log(item);
    }

  }

})();

