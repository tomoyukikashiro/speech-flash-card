(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsCreateDialogController', cardsCreateDialogController);

  cardsCreateDialogController.$inject = ['$routeParams', '$mdDialog', 'resourceCard', 'baseController', 'isFirst', 'bookId'];

  function cardsCreateDialogController($routeParams, $mdDialog, resourceCard, baseController, isFirst, bookId) {
    angular.extend(this, baseController);
    var vm = this;
    vm.submit = submit;
    vm.isFirst = isFirst;


    ////////////////
    function submit() {
      var param = {
        bookId: bookId || $routeParams.bookId
      };
      var postData = {
        text : vm.text,
        note : vm.note
      };
      resourceCard.resource.save(param, postData, function(response) {
        vm.routers.card.goDetail(param.bookId, response.id);
        $mdDialog.hide();
      });
    }
  }

})();
