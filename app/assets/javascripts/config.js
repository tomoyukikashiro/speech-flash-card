(function() {

  'use strict';
  angular.module('englishFlashCardApp')
    .constant('APP_CONFIG',
      {
        AUTH_TOKEN : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    );

})();
