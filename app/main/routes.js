'use strict';
(function () {
  angular.module('main')
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://dementecreativo.com/**'
    ]);
    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/beacon/search');
    $stateProvider
      .state('beacon', {
        url: '/beacon',
        abstract: true,
        templateUrl: 'main/templates/main.html'
      })
      // this state is placed in the <ion-nav-view> in the index.html
      .state('beacon.search', {
        url: '/search',
        views: {
          'search': {
            templateUrl: 'main/templates/search.html',
            controller: 'HomeCtrl as vm'
          }
        }
      })
      .state('beacon.list', {
        url: '/list',
        views: {
          'list': {
            templateUrl: 'main/templates/list.html',
            controller: 'ListCtrl as vm'
          }
        }
      })
      .state('beacon.find', {
        url: '/find/:url',
        views: {
          'search': {
            templateUrl: 'main/templates/find.html',
            controller: 'FindCtrl as vm'
          }
        }
      });
  });


})();
