(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
      .controller('appController', appController);

  appController.$inject = ['$rootScope', 'baseController', 'APP_CONFIG', 'cardList', 'resourceCard'];

  function appController($rootScope, baseController, APP_CONFIG, cardList, resourceCard) {
    angular.extend(this, baseController);

    var vm = this;
    vm.cardList = cardList;
    vm.cardListData = [];
    vm.page = {
      name: APP_CONFIG.PAGE_NAME.BOOK
    };
    activate();

    function activate() {
      $rootScope.$on('pagechange', onPageChange);
    }

    function onPageChange(e, data) {
      vm.page.name = data.name;
      if(vm.page.name === vm.APP_CONFIG.PAGE_NAME.CARD){
        vm.page.preName = vm.APP_CONFIG.PAGE_NAME.BOOK + ' > ';
        // prepare card list
        resourceCard.getList().then(function(data){
          vm.cardListData = data;
        });
        //
      }else{
        vm.page.preName = '';
      }
    }
  }
})();
