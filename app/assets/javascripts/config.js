(function() {

  'use strict';
  angular.module('EnglishFlashCard')
    .constant('APP_CONFIG',
      {
        AUTH_TOKEN : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        PAGE_NAME: {
          BOOK: 'books',
          CARD: 'cards'
        }
      }
    );

})();
