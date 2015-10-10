(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('resolveRedirection', resolveRedirection);

  resolveRedirection.$inject = ['$location', '$q'];

  function resolveRedirection($location, $q) {
    return {
      redirect: redirect
    };

    ///
    function redirect(promise, successPath, errorPath) {
      var dfd = $q.defer();
      promise.then(function(res) {
        if(successPath){
          $location.path(successPath);
        }else{
          dfd.resolve(res);
        }
      }, function(res){
        if(errorPath){
          $location.path(errorPath);
        }else{
          dfd.resolve(res);
        }
      });
      return dfd.promise;
    }
  }
})();
