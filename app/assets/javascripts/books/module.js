(function() {

  'use strict';

  angular.module('books',
    [
      'common.resource.book',
      'common.resource.session',
      'common.router.book',
      'common.router.card'
    ]
  );

})();
