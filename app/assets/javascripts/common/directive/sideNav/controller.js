(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('sideNavController', sideNavController);

  sideNavController.$inject = [
    '$location', '$mdDialog', 'resourceSession',
    'auioSettingsDialog', 'personalSettingsDialog'
  ];

  function sideNavController($location, $mdDialog, resourceSession, auioSettingsDialog, personalSettingsDialog) {
    var vm = this;
    vm.logout = logout;
    vm.audioSettings = audioSettings;
    vm.personalSettings = personalSettings;

    function audioSettings(e){
      auioSettingsDialog.show(e);
    }
    function personalSettings(e){
      personalSettingsDialog.show(e);
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
          resourceSession.logout().then(function(){
            $location.path('/');
          });
        });
    }

  }

})();
