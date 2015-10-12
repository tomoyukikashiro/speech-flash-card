(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('resourceSession', resourceSession);

  resourceSession.$inject = ['$resource', 'resourceUser'];

  function resourceSession($resource, resourceUser) {
    var resource = $resource('/api/sessions/:userId', {userId: '@userId'});

    return {
      resource: resource,
      logout  : logout
    };

    ///
    function logout() {
      return resource.remove({userId: resourceUser.getData().id}).$promise;
      resourceUser.clearCache();
    }
  }

})();
