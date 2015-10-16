(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardListController', cardListController);

  cardListController.$inject = ['$scope', 'baseController', 'cardList'];

  function cardListController($scope, baseController, cardList) {
    angular.extend(this, baseController);

    var vm = this;
    vm.changeCard = changeCard;

    activate();

    function changeCard(id) {
      vm.routers.card.goDetail(null,id);
      cardList.close();
    }

    function activate() {
      $scope.$on('changecard', function(e, id) {
        vm.currentId = id;
      });
    }
  }

})();
