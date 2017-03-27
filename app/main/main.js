'use strict';
(function () {
  angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
    // TODO: load other modules selected during generation
  ])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(ready);
  });
  function ready () {
    /*if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }*/
  }
})();
