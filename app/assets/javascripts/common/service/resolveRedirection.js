(function() {
  'use strict';

  angular
    .module('common.service.resolveRedirection', [])
    .factory('CommonResolveRedirection', CommonResolveRedirection);

  CommonResolveRedirection.$inject = ['$location', '$q'];

  function CommonResolveRedirection($location, $q) {
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
