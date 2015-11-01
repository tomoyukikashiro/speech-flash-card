(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .factory('routerBook', routerBook);

  routerBook.$inject = ['$location'];

  function routerBook($location) {
    var path = '/books/';

    function goList() {
      $location.path(path);
    }
    function getList() {
      return path;
    }

    // export
    return {
      goList: goList,
      getList: getList
    };
  }
})();
