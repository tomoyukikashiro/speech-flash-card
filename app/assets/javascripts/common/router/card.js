(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .factory('routerCard', routerCard);

  routerCard.$inject = ['$location', '$routeParams'];

  function routerCard($location, $routeParams) {
    var path = '/books/:bookId/cards/:cardId/';

    function createPath(bookId, cardId) {
      var _bookId = bookId || $routeParams.bookId;
      var _cardId = cardId || '';
      return path.replace(':bookId', _bookId).replace(':cardId', _cardId);
    }

    function goDetail(bookId, cardId) {
      var _path = createPath(bookId, cardId);
      $location.path(_path);
    }

    // export
    return {
      goDetail: goDetail
    };
  }
})();
