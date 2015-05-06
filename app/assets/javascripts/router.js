(function() {

  'use strict';

  angular.module('englishFlashCardApp')
    .config(appRouter);

  appRouter.$inject = ['$routeProvider', '$locationProvider'];

  function appRouter($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/login'});
  }

})();
