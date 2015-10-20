(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('createBookDialog', createBookDialog);

  createBookDialog.$inject = ['$mdDialog'];

  function createBookDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event, isFirst) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/books/dialog/create.html',
        controller: 'booksCreateDialogController',
        controllerAs: 'booksCreate',
        focusOnOpen: false,
        onComplete: function(scope, elm) {
          elm.find('input').eq(0).focus();
        },
        locals: {
          isFirst: isFirst
        }
      });
    }
  }
})();
