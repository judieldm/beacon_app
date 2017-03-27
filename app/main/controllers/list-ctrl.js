'use strict';
(function(){

angular.module('main')
.controller('ListCtrl', listCtrl)

function listCtrl ($log) {

  $log.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);

};
})();
