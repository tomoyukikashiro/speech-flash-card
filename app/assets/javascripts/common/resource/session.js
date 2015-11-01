(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .factory('resourceSession', resourceSession);

  resourceSession.$inject = ['$resource', 'resourceUser', '$q'];

  function resourceSession($resource, resourceUser, $q) {
    var resource = $resource('/api/sessions/');

    return {
      resource: resource,
      logout  : logout
    };

    ///
    function logout() {
      var dfd = $q.defer();
      resource.remove({}, function() {
        resourceUser.clearCache();
        dfd.resolve();
      }, function() {
        dfd.reject();
      });
      return dfd.promise;
    }
  }

})();
