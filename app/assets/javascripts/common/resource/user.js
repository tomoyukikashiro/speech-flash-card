(function() {
  'use strict';

  angular
    .module('common.resource.user', ['ngResource',])
    .factory('CommonResourceUser', CommonResourceUser);

  CommonResourceUser.$inject = ['$resource', '$q'];

  function CommonResourceUser($resource, $q) {
    var resource = $resource('/users/');
    var data;
    return {
      getData: function() {return data;},
      resource: resource,
      checkCurrent: checkCurrent
    };

    //////
    function checkCurrent() {
      var dfd = $q.defer();
      resource.get({},function(user) {
        data = user;
        dfd.resolve(user);
      }, function() {
        dfd.reject();
      });
      return dfd.promise;
    }

  }

})();
