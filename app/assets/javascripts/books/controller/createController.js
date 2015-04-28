(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksCreateController', BooksCreateController);

  BooksCreateController.$inject = ['CommonResourceBook', 'CommonRouterCard'];

  function BooksCreateController(CommonResourceBook, CommonRouterCard) {
    var vm = this;
    vm.submit = submit;

    ////
    function submit() {
      CommonResourceBook.resource.save({name: vm.bookName}, function(response) {
        CommonRouterCard.goList(response.id);
      });
    }
  }

})();
