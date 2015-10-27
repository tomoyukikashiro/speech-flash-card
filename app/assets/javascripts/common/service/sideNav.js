(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .service('sideNav', sideNav);

  sideNav.$inject = ['$mdSidenav', '$mdUtil'];

  function sideNav($mdSidenav, $mdUtil) {
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
