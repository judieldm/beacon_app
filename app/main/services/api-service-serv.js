'use strict';
(function () {
  angular.module('main')
  .service('ApiService', function ($http, $q) {
    var vm = this;
    var url = 'https://cloud.estimote.com/';
    var method = {
      devices: 'v2/devices',
      link: 'v3/here_and_now/devices/',

    };
   vm.getDevices= onGetDevices;
   vm.getLink = ongetLink;
   function onGetDevices(){
     $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('johan-canzanese-net-s---fz4' + ':' + 'bda0195d4c72c6d493e5ab85a59ad16a');
     var defered = $q.defer();
     var promise = defered.promise;
     $http({
        method: 'GET',
        url: url + method.devices,
      })
      .success(function (data) {
        defered.resolve(data);
      })
      .error(function (err) {
        defered.reject(err);
      });
      return promise;
   }
   function ongetLink(deviceid){
     $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('johan-canzanese-net-s---fz4' + ':' + 'bda0195d4c72c6d493e5ab85a59ad16a');
     var defered = $q.defer();
     var promise = defered.promise;
     $http({
        method: 'GET',
        url: url + method.link + deviceid
      })
      .success(function (data) {
        defered.resolve(data);
      })
      .error(function (err) {
        defered.reject(err);
      });
      return promise;
   }

  });
})();

