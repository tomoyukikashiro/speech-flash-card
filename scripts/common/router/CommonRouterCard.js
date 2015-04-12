(function() {

  'use strict';

  angular.module('common.router.card', [])
    .factory('CommonRouterCard', ['$location', '$routeParams', function($location, $routeParams) {

      var path = '/books/:bookId/cards/:cardId',
          prefix = '#';

      function createPath(bookId, cardId) {
        var _bookId = bookId || $routeParams.bookId;
        var _cardId = cardId || '';
        return path.replace(':bookId', _bookId).replace(':cardId', _cardId);
      }

      function getCreate(bookId) {
        var _path = createPath(bookId, 'create');
        return prefix + _path;
      }

      function getLink(bookId, cardId) {
        var _path = createPath(bookId, cardId);
        return prefix + _path;
      }

      function goList(bookId, cardId) {
        var _path = createPath(bookId, cardId);
        $location.path(_path);
      }

      function goDetail(bookId, cardId) {
        goList(bookId, cardId);
      }

      // export
      return {
        getCreate: getCreate,
        getLink: getLink,
        goList: goList,
        goDetail: goDetail
      };

    }]);

})();
