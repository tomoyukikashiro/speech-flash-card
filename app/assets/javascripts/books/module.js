(function() {

  'use strict';

  angular.module('books',
    [
      'common.controller.base',
      'common.resource.book',
      'common.resource.session',
      'common.router.book',
      'common.router.card',
      'common.service.booksCreate.dialog',
      'common.service.booksEdit.dialog'
    ]
  );

})();
