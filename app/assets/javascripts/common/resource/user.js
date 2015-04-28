(function() {
  'use strict';

  angular
    .module('common.resource.user', ['ngResource',])
    .factory('CommonResourceUser', CommonResourceUser);

  CommonResourceUser.$inject = ['$resource', '$cacheFactory', '$q'];

  function CommonResourceUser($resource, $cacheFactory, $q) {
    var cache = $cacheFactory('userData');
    var resource = $resource('/users/', {}, {
          get: {cache: cache}
        });
    return {
      resource: resource,
      checkCurrent: checkCurrent
    };

    //////
    function checkCurrent() {
      var dfd = $q.defer();
      resource.get({},function(user) {
        dfd.resolve(user);
      }, function() {
        dfd.resolve();
      });
      return dfd.promise;
    }

  }

})();
