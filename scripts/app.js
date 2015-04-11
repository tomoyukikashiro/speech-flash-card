(function() {

  'use strict';

  angular.module('englishFlashCardApp', [
      'ngRoute',
      'books',
      'cards'
  ]);

  angular.module('englishFlashCardApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/books'});
  }]);

})();
