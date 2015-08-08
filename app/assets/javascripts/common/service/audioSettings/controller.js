(function() {
  'use strict';

  angular
    .module('common.service.audioSettings.dialog')
    .controller('CommonServiceAudioSettingsDialogController', CommonServiceAudioSettingsDialogController);

  CommonServiceAudioSettingsDialogController.$inject = [
    'CommonControllerBaseController', 'CommonResourceUser',
    '$mdDialog', 'CommonResourceUserAudioSettings'];

  function CommonServiceAudioSettingsDialogController(CommonControllerBaseController, CommonResourceUser,
      $mdDialog, CommonResourceUserAudioSettings) {

    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.user = angular.copy(CommonResourceUser.getData());

    vm.submit = submit;

    function submit(){
      /*jshint camelcase: false */
      var as = vm.user.audio_settings,
          data = {speed: as.speed, repeat: as.repeat};
      CommonResourceUserAudioSettings.resource.update({userId: vm.user.id}, data).$promise
        .then(function(){
          CommonResourceUser.setAudioData(data);
          vm.user = angular.copy(CommonResourceUser.getData());
          $mdDialog.hide();
        }, function(e){
          console.log(e);
        });
    }
  }

})();
