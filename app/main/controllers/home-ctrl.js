'use strict';
(function(){

  angular.module('main')
  .controller('HomeCtrl',homeCtrl);

  function homeCtrl ($log) {

    $log.log('Hello from your Controller: HomeCtrl in module main:. This is your controller:', this);

  }

})();

