(function() {
  'use strict';

  angular
    .module('common.service.sideNav', [])
    .service('CommonServiceSideNav', CommonServiceSideNav);

  CommonServiceSideNav.$inject = ['$mdSidenav', '$mdUtil'];

  function CommonServiceSideNav($mdSidenav, $mdUtil) {
    this.toggleLeft = buildToggler('left');
    this.close = function(){$mdSidenav('left').close();};

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle();
          },300);
      return debounceFn;
    }

  }

})();
