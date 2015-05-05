(function() {

  'use strict';

  angular.module('cards',
    [
      'common.controller.base',
      'common.resource.card',
      'common.router.book',
      'common.router.card',
      'common.service.speech',
      'common.service.cardsCreate.dialog'
    ]
  );

})();
