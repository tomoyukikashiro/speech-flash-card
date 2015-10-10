(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('resourceUserAudioSettings', resourceUserAudioSettings);

  resourceUserAudioSettings.$inject = ['$resource', '$q'];

  function resourceUserAudioSettings($resource) {
    var resource = $resource('/api/users/:userId/audio_settings', {userId: '@userId'}, {update: {method: 'PUT'}});
    return {
      resource: resource
    };
  }

})();
