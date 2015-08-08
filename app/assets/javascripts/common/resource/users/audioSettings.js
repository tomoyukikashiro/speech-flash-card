(function() {
  'use strict';

  angular
    .module('common.resource.users.audioSettings', ['ngResource'])
    .factory('CommonResourceUserAudioSettings', CommonResourceUserAudioSettings);

  CommonResourceUserAudioSettings.$inject = ['$resource', '$q'];

  function CommonResourceUserAudioSettings($resource) {
    var resource = $resource('/api/users/:userId/audio_settings', {userId: '@userId'}, {update: {method: 'PUT'}});
    return {
      resource: resource
    };
  }

})();
