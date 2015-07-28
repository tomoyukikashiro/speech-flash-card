(function() {

  'use strict';

  angular.module('englishFlashCardApp', [
      'ngRoute',
      'ngAria',
      'ngMaterial',
      'books',
      'cards',
      'login',
      'signup'
  ]).config(appConfig);

  appConfig.$inject = ['$httpProvider', 'APP_CONFIG'];
  ///
  function appConfig($httpProvider, APP_CONFIG) {
    angular.forEach(['post', 'put', 'delete'], function(method) {
      if ($httpProvider.defaults.headers[method]) {
        $httpProvider.defaults.headers[method]['X-CSRF-Token'] = APP_CONFIG.AUTH_TOKEN;
      } else {
        $httpProvider.defaults.headers[method] = {'X-CSRF-Token': APP_CONFIG.AUTH_TOKEN};
      }
    });
  }

})();
