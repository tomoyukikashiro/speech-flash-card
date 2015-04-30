(function() {
  'use strict';

  angular
    .module('common.resource.session', ['ngResource'])
    .factory('CommonResourceSession', CommonResourceSession);

  CommonResourceSession.$inject = ['$resource', 'CommonResourceUser'];

  function CommonResourceSession($resource, CommonResourceUser) {
    var resource = $resource('/api/sessions/:userId', {userId: '@userId'});

    return {
      resource: resource,
      logout  : logout
    };

    ///
    function logout() {
      return resource.remove({userId: CommonResourceUser.getData().id}).$promise;
    }
  }

})();
