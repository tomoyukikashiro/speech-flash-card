(function() {
  'use strict';

  angular
    .module('app', [
      'common.controller.base',
      'cards'
    ])
    .controller('appController', appController);

  appController.$inject = ['$rootScope', 'CommonControllerBaseController', 'APP_CONFIG', 'CardList', 'CommonResourceCard'];

  function appController($rootScope, CommonControllerBaseController, APP_CONFIG, CardList, CommonResourceCard) {
    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.cardList = CardList;
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
        CommonResourceCard.getList().then(function(data){
          vm.cardListData = data;
        });
      }
    }
  }
})();
