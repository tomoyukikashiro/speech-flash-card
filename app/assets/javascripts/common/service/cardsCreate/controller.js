(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
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
      var param = {
        bookId: bookId || $routeParams.bookId
      };
      var postData = {
        text : vm.text,
        note : vm.note
      };
      resourceCard.save(param, postData).then(function(cardList) {
        $mdDialog.hide().then(function() {
          $rootScope.$broadcast('updatecard', cardList);
          commonToast.notice({notice: 'created card'});
          vm.routers.card.goDetail(undefined, cardList[cardList.length-1].id);
        });
      }, function(data) {
        if(resourceCard.isTooManyCard(data)){
          commonDialog.alert({content: 'Cardはこれ以上つくれません'});
        }
      });
    }
  }

})();
