(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .service('cardList', cardList);

  cardList.$inject = ['$mdSidenav', '$mdUtil'];

  function cardList($mdSidenav, $mdUtil) {
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
