(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsCreateDialogController', cardsCreateDialogController);

  cardsCreateDialogController.$inject = ['$routeParams', '$mdDialog', 'resourceCard', 'baseController'];

  function cardsCreateDialogController($routeParams, $mdDialog, resourceCard, baseController) {
    angular.extend(this, baseController);
    var vm = this;
    vm.submit = submit;

    ////////////////
    function submit() {
      var param = {
        bookId: $routeParams.bookId
      };
      var postData = {
        text : vm.text,
        note : vm.note
      };
      resourceCard.resource.save(param, postData, function(response) {
        vm.routers.card.goDetail(undefined, response.id);
        $mdDialog.hide();
      });
    }
  }

})();
