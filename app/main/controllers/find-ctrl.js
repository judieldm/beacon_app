'use strict';
(function () {
  angular.module('main')
  .controller('FindCtrl', function ($stateParams) {
    var vm = this;
    vm.url = $stateParams.url;
  });
})();

