(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('resourceUser', resourceUser);

  resourceUser.$inject = ['$resource', '$q'];

  function resourceUser($resource, $q) {
    /*jshint camelcase: false */
    var resource = $resource('/api/users/:id', null, {
      'update': {method: 'PUT'}
    });
    var data;
    return {
      getData: function() {return data;},
      setAudioData: function(newData) {data.audio_settings = newData;},
      resource: resource,
      checkCurrent: checkCurrent,
      clearCache: clearCache
    };

    function clearCache() {
      data = null;
    }

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

        data = data.id ? data : null;

        dfd.resolve(data);
      }, function() {
        dfd.reject();
      });
      return dfd.promise;
    }

  }

})();
