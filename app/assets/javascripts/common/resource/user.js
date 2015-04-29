(function() {
  'use strict';

  angular
    .module('common.resource.user', ['ngResource',])
    .factory('CommonResourceUser', CommonResourceUser);

  CommonResourceUser.$inject = ['$resource', '$q'];

  function CommonResourceUser($resource, $q) {
    var resource = $resource('/users/');
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
