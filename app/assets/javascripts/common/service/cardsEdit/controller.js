(function() {
  'use strict';

  angular
    .module('common.service.cardsEdit.dialog')
    .controller('CommonServiceCardsEditDialogController', CommonServiceCardsEditDialogController);

  CommonServiceCardsEditDialogController.$inject = ['$routeParams', '$mdDialog', 'CommonResourceCard', 'CommonControllerBaseController', 'card'];

  function CommonServiceCardsEditDialogController($routeParams, $mdDialog, CommonResourceCard, CommonControllerBaseController, card) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    var cardIterator = CommonResourceCard.getIterator();
    vm.card = card;
    vm.submit = submit;
    vm.remove = remove;

    ////////////////
    function remove() {
      var param = getParams();
      CommonResourceCard.remove(param)
        .then(function () {
          $mdDialog.hide();
          if(cardIterator.hasNext){
            vm.routes.card.goDetail(null, cardIterator.getNext());
          }else if (cardIterator.hasPrev){
            vm.routes.card.goDetail(null, cardIterator.getPrev());
          }else{
            vm.routes.book.goList();
          }
        });
    }
    function submit() {
      var param = getParams();
      var postData = {
        text : vm.text,
        note : vm.note
      };
      CommonResourceCard.update(param, postData)
        .then(function () {
          $mdDialog.hide();
        });
    }
    function getParams() {
      return {
        bookId: $routeParams.bookId,
        cardId: $routeParams.cardId
      };
    }
  }

})();
