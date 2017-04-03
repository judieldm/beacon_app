'use strict';
(function () {
  angular.module('main')
  .service('ApiService', function ($http, $q) {
    var vm = this;
    var url = 'https://connect.onyxbeacon.com/';
    var method = {
      auth: 'oauth/client',
      uuid: 'api/v2.5/beacons',
      campaign: 'api/v2.5/campaigns',
      coupons: 'api/v2.5/coupons'
    };
    vm.getToken = getToken;
    vm.getUUid = getUUid;
    vm.getCampaign = getCampaign;
    vm.getCoupons = getCoupons;
    function getToken () {
      var defered = $q.defer();
      var promise = defered.promise;
      var params = {
        'client_id': 'af1cd006576dc09b7cf7660d4e010fbf434ad4bf',
        'client_secret': '335c77e0ff4a4d36b97e8464ef880cdef30fb795',
        'scope': 'crud'
      };
      $http({
        method: 'POST',
        url: url + method.auth,
        data: params
      })
      .success(function (data) {
        defered.resolve(data);
      })
      .error(function (err) {
        defered.reject(err);
      });
      return promise;
    }
    function getUUid (token) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
        method: 'GET',
        url: url + method.uuid,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .success(function (data) {
        defered.resolve(data);
      })
      .error(function (err) {
        defered.reject(err);
      });
      return promise;
    }
    function getCampaign (token) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
        method: 'GET',
        url: url + method.campaign,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .success(function (data) {
        defered.resolve(data);
      })
      .error(function (err) {
        defered.reject(err);
      });
      return promise;
    }
    function getCoupons (token) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
        method: 'GET',
        url: url + method.coupons,
        headers: {
          'Authorization': 'Bearer ' + token
        }
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

