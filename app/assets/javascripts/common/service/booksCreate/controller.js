(function() {
  'use strict';

  angular
    .module('common.service.booksCreate.dialog')
    .controller('CommonServiceBooksCreateDialogController', CommonServiceBooksCreateDialogController);

  CommonServiceBooksCreateDialogController.$inject = ['CommonResourceBook', 'CommonControllerBaseController'];

  function CommonServiceBooksCreateDialogController(CommonResourceBook, CommonControllerBaseController) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.submit = submit;

    ////
    function submit() {
      CommonResourceBook.resource.save({}, {name: vm.bookName}, function(response) {
        vm.routers.card.goCreate(response.id);
      });
    }
  }

})();
