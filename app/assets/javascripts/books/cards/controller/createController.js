(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsCreateController', CardsCreateController);

  CardsCreateController.$inject = ['$routeParams', 'CommonResourceCard', 'CommonControllerBaseController'];

  function CardsCreateController($routeParams, CommonResourceCard, CommonControllerBaseController) {
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
        vm.routers.card.goDetail($routeParams.bookId, response.id);
      });
    }
  }
})();
