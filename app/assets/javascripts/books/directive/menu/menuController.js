(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksMenuController', BooksMenuController);

  BooksMenuController.$inject = ['CommonControllerBaseController', 'CommonServiceCreateBookDialog'];

  function BooksMenuController(CommonControllerBaseController, CommonServiceCreateBookDialog) {

    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.menu = {
      isOpen: false
    };
    vm.createBookDialog = CommonServiceCreateBookDialog;
  }
})();
