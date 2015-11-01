(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('cardsCreateDialogController', cardsCreateDialogController);

  cardsCreateDialogController.$inject = ['$rootScope', '$routeParams', '$mdDialog', 'resourceCard', 'baseController', 'isFirst', 'bookId', 'commonDialog', 'commonToast', 'analytics'];

  function cardsCreateDialogController($rootScope, $routeParams, $mdDialog, resourceCard, baseController, isFirst, bookId, commonDialog, commonToast, analytics) {
    angular.extend(this, baseController);
    var vm = this;
    vm.submit = submit;
    vm.isFirst = isFirst;

    activate();

    function activate() {
      analytics.sendCurrentPageView('/cards/create/');
    }

    ////////////////
    function submit() {
      var _bookId =  bookId || $routeParams.bookId;
      var param = {
        bookId: _bookId
      };
      var postData = {
        text : vm.text,
        note : vm.note
      };
      resourceCard.save(param, postData).then(function(cardList) {
          $mdDialog.hide();
          $rootScope.$broadcast('updatecard', cardList);
          commonToast.notice({notice: 'created card'});
          vm.routers.card.goDetail(_bookId, cardList[cardList.length-1].id);
      }, function(response) {
        if(resourceCard.isTooManyCard(response.data)){
          commonDialog.alert({content: 'Cardはこれ以上つくれません'});
        }
      });
    }
  }

})();
