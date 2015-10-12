(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsEditDialogController', cardsEditDialogController);

  cardsEditDialogController.$inject = ['$routeParams', '$mdDialog', 'resourceCard', 'baseController', 'card'];

  function cardsEditDialogController($routeParams, $mdDialog, resourceCard, baseController, card) {
    angular.extend(this, baseController);
    var vm = this;
    var cardIterator = resourceCard.getIterator();
    vm.card = card;
    vm.submit = submit;
    vm.remove = remove;

    ////////////////
    function remove() {
      var param = getParams();
      resourceCard.remove(param)
        .then(function () {
          $mdDialog.hide();
          if(cardIterator.hasNext){
            vm.routers.card.goDetail(null, cardIterator.getNext());
          }else if (cardIterator.hasPrev){
            vm.routers.card.goDetail(null, cardIterator.getPrev());
          }else{
            vm.routers.book.goList();
          }
        });
    }
    function submit() {
      var param = getParams();
      var postData = {
        text : vm.card.text,
        note : vm.card.note
      };
      resourceCard.update(param, postData)
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
