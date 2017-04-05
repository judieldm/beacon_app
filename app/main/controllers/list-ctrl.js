'use strict';
(function () {

  angular.module('main')
  .controller('ListCtrl', listCtrl);

  function listCtrl ($log, $cordovaInAppBrowser, $ionicPlatform, DataService, $state) {
    var vm = this;
    /*var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };*/
    vm.delete = onDelete;
    vm.open = onOpen;
    vm.coupons = [];
    var coupons = DataService.selectCoupons();
    coupons.then(function (res) {
      for (var i = 0; i < res.rows.length; i++) {
        var obj = JSON.parse(res.rows.item(i).coupon);
        $log.log(obj);
        obj.isVisited = res.rows.item(i).isVisited;
        obj.id = res.rows.item(i).id;
        vm.coupons.push(obj);
      }
    });
    $log.log(vm.coupons);
    function onOpen (item) {
      $log.log(item);
      //$cordovaInAppBrowser.open(item, '_self', options);
      $state.go('beacon.find', {'url': item});
    }
    function onDelete (item) {
      $log.log(item);
    }

  }
})();
