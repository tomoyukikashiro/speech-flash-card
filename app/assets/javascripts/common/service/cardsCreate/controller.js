(function() {
  'use strict';

  angular
    .module('common.service.cardsCreate.dialog')
    .controller('CommonServiceCardsCreateDialogController', CommonServiceCardsCreateDialogController);

  CommonServiceCardsCreateDialogController.$inject = ['$routeParams', '$mdDialog', 'CommonResourceCard', 'CommonControllerBaseController'];

  function CommonServiceCardsCreateDialogController($routeParams, $mdDialog, CommonResourceCard, CommonControllerBaseController) {
    angular.extend(this, CommonControllerBaseController);
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
      CommonResourceCard.resource.save(param, postData, function(response) {
        vm.routers.card.goDetail(undefined, response.id);
        $mdDialog.hide();
      });
    }
  }

})();
