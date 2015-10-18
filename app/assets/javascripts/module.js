(function() {

  'use strict';

  angular.module('EnglishFlashCard', [
      'ngRoute',
      'ngAria',
      'ngMaterial',
      'ngResource'
  ])
  .config(appConfig)
  .run(['speech', 'commonToast', 'disableVoiceDialog', function(speech, commonToast, disableVoiceDialog) {

    if(!window.SpeechSynthesisUtterance){
      disableVoiceDialog.show();
      return;
    }
    speech.bindVoicesLoad();
    commonToast.notice(FLASH);
  }]);

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
