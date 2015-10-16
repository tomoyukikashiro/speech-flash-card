(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .service('analytics', analytics);

  analytics.$inject = ['$location'];

  function analytics($location) {

    this.sendCurrentPageView = function(path){
      ga('send', 'pageview', path || $location.path());
    }
  }
})();
