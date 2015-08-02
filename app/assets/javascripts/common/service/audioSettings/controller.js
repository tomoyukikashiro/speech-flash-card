(function() {
  'use strict';

  angular
    .module('common.service.audioSettings.dialog')
    .controller('CommonServiceAudioSettingsDialogController', CommonServiceAudioSettingsDialogController);

  CommonServiceAudioSettingsDialogController.$inject = ['CommonControllerBaseController', 'CommonResourceUser', '$mdDialog'];

  function CommonServiceAudioSettingsDialogController(CommonControllerBaseController, CommonResourceUser, $mdDialog) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.user = CommonResourceUser.getData();

    vm.submit = submit;

    function submit(){
      CommonResourceUser.resource.update({id: vm.user.id},vm.user).$promise
        .then(function(){
          $mdDialog.hide();
        }, function(e){
          console.log(e);
        });
    }
  }

})();
