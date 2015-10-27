(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('audioSettingsDialogController', audioSettingsDialogController);

  audioSettingsDialogController.$inject = [
    'baseController', 'resourceUser',
    '$mdDialog', 'resourceUserAudioSettings'];

  function audioSettingsDialogController(baseController, resourceUser,
      $mdDialog, resourceUserAudioSettings) {

    angular.extend(this, baseController);
    var vm = this;
    vm.user = angular.copy(resourceUser.getData());

    vm.submit = submit;

    function submit(){
      /*jshint camelcase: false */
      var as = vm.user.audio_settings,
          data = {speed: as.speed, repeat: as.repeat};
      resourceUserAudioSettings.resource.update({}, data).$promise
        .then(function(){
          resourceUser.setAudioData(data);
          vm.user = angular.copy(resourceUser.getData());
          $mdDialog.hide();
        }, function(){
          // TODO ログ
        });
    }
  }

})();
