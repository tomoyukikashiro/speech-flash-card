(function() {
  'use strict';

  angular
    .module('common.router.card', [])
    .factory('CommonRouterCard', CommonRouterCard);

  CommonRouterCard.$inject = ['$location', '$routeParams'];

  function CommonRouterCard($location, $routeParams) {
    var path = '/books/:bookId/cards/:cardId';

    function createPath(bookId, cardId) {
      var _bookId = bookId || $routeParams.bookId;
      var _cardId = cardId || '';
      return path.replace(':bookId', _bookId).replace(':cardId', _cardId);
    }

    function getLink(bookId, cardId) {
      return createPath(bookId, cardId);
    }

    function goDetail(bookId, cardId) {
      var _path = createPath(bookId, cardId);
      $location.path(_path);
    }

    function goCreate(bookId) {
      var _path = createPath(bookId, 'create');
      $location.path(_path);
    }

    // export
    return {
      getLink : getLink,
      goDetail: goDetail,
      goCreate: goCreate
    };
  }
})();
