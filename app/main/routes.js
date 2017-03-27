'use strict';
(function(){
  angular.module('main')
  .config(function ($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/main');
    $stateProvider
      // this state is placed in the <ion-nav-view> in the index.html
      .state('main', {
        url: '/main',
        //template: '<ion-view view-title="main">hi</ion-view>',
         templateUrl: 'main/templates/list-controller.html',
        // controller: 'SomeCtrl as ctrl'
      })
      .state('list', {
        url: '/list',
        //template: '<ion-view view-title="main"></ion-view>',
         templateUrl: 'main/templates/list-controller.html',
        // controller: 'SomeCtrl as ctrl'
      });;
  });


  })();