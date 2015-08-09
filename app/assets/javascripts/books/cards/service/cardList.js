(function() {
  'use strict';

  angular
    .module('cards')
    .service('CardList', CardList);

  CardList.$inject = ['$mdSidenav', '$mdUtil'];

  function CardList($mdSidenav, $mdUtil) {
    this.toggleLeft = buildToggler('right');
    this.close = function(){$mdSidenav('right').close();};

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle();
          },300);
      return debounceFn;
    }

  }

})();
