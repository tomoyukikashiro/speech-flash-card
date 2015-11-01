(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('cardsEditDialogController', cardsEditDialogController);

  cardsEditDialogController.$inject = ['$rootScope', '$routeParams', '$mdDialog', 'resourceCard', 'baseController', 'card', 'commonToast', 'analytics'];

  function cardsEditDialogController($rootScope, $routeParams, $mdDialog, resourceCard, baseController, card, commonToast, analytics) {
    angular.extend(this, baseController);
    var vm = this;
    var cardIterator = resourceCard.getIterator(card);
    vm.card = card;
    vm.submit = submit;
    vm.remove = remove;

    activate();

    function activate() {
      analytics.sendCurrentPageView('/cards/edit/');
    }

    ////////////////
    function remove() {
      var param = getParams();
      resourceCard.remove(param)
        .then(function () {
          $mdDialog.hide();
          commonToast.notice({notice: 'delete card'});
          if(cardIterator.hasNext()){
            vm.routers.card.goDetail(null, cardIterator.getNext().id);
          }else if (cardIterator.hasPrev()){
            vm.routers.card.goDetail(null, cardIterator.getPrev().id);
          }else{
            vm.routers.book.goList();
          }
          $rootScope.$broadcast('updatecard', resourceCard.getList());
          resourceCard.getList().then(function(cardList) {
            $rootScope.$broadcast('updatecard', cardList);
          });
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
          commonToast.notice({notice: 'update card'});
          resourceCard.getList().then(function(cardList) {
            $rootScope.$broadcast('updatecard', cardList);
          });
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
