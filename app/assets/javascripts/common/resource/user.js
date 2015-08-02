(function() {
  'use strict';

  angular
    .module('common.resource.user', ['ngResource',])
    .factory('CommonResourceUser', CommonResourceUser);

  CommonResourceUser.$inject = ['$resource', '$q'];

  function CommonResourceUser($resource, $q) {
    var resource = $resource('/api/users/:id', null, {
      'update': {method: 'PUT'}
    });
    var data;
    return {
      getData: function() {return data;},
      resource: resource,
      checkCurrent: checkCurrent
    };

    //////
    function checkCurrent() {
      var dfd = $q.defer();

      if(data){
        dfd.resolve(data);
        return dfd.promise;
      }

      resource.get({},function(user) {
        data = angular.copy(user);
        delete data.$promise;
        delete data.$resolved;

        dfd.resolve(user);
      }, function() {
        dfd.reject();
      });
      return dfd.promise;
    }

  }

})();
