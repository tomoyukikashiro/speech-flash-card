(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksCreateController', BooksCreateController);

  BooksCreateController.$inject = ['CommonResourceBook', 'CommonControllerBaseController'];

  function BooksCreateController(CommonResourceBook, CommonControllerBaseController) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.submit = submit;

    ////
    function submit() {
      CommonResourceBook.resource.save({name: vm.bookName}, function(response) {
        vm.routers.card.goList(response.id);
      });
    }
  }

})();
