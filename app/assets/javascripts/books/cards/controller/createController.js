(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsCreateController', CardsCreateController);

  CardsCreateController.$inject = ['$routeParams', 'CommonResourceCard', 'CommonRouterCard'];

  function CardsCreateController($routeParams, CommonResourceCard, CommonRouterCard) {
    var vm = this;
    vm.submit = submit;


    ////////////////
    function submit() {
      var param = {
        bookId: $routeParams.bookId
      };
      var postData = {
        text : vm.text
      };
      CommonResourceCard.resource.save(param, postData, function(response) {
        CommonRouterCard.goDetail($routeParams.bookId, response.id);
      });
    }
  }
})();
