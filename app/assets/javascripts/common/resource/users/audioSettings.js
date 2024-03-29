(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .factory('resourceUserAudioSettings', resourceUserAudioSettings);

  resourceUserAudioSettings.$inject = ['$resource', '$q'];

  function resourceUserAudioSettings($resource) {
    var resource = $resource('/api/users/audio_settings', {}, {update: {method: 'PUT'}});
    return {
      resource: resource
    };
  }

})();
