(function() {
  'use strict';

  angular
    .module('common.directive.sideNav')
    .controller('CommonServiceSideNavController', CommonServiceSideNavController);

  CommonServiceSideNavController.$inject = ['$location', '$mdDialog', 'CommonResourceSession', 'CommonServiceAuioSettingsDialog'];

  function CommonServiceSideNavController($location, $mdDialog, CommonResourceSession, CommonServiceAuioSettingsDialog) {
    var vm = this;
    vm.logout = logout;
    vm.audioSettings = audioSettings;

    function audioSettings(e){
      CommonServiceAuioSettingsDialog.show(e);
    }

    function logout(e){
      var dialog = $mdDialog.confirm()
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .title('Logout')
          .ariaLabel('Logout confirm dialog')
          .content('Are you sure you want to logout ?')
          .ok('Confirm')
          .cancel('Cancel')
          .targetEvent(e);
      $mdDialog.show(dialog)
        .then(function(){
          CommonResourceSession.logout().then(function(){
            $location.path('/');
          });
        });
    }

  }

})();
