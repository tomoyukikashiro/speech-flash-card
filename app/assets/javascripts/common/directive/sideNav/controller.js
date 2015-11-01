(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('sideNavController', sideNavController);

  sideNavController.$inject = [
    '$window', '$mdDialog', 'resourceSession',
    'auioSettingsDialog', 'personalSettingsDialog'
  ];

  function sideNavController($window, $mdDialog, resourceSession, auioSettingsDialog, personalSettingsDialog) {
    var vm = this;
    vm.logout = logout;
    vm.goTw = goTw;
    vm.audioSettings = audioSettings;
    vm.personalSettings = personalSettings;

    function audioSettings(e){
      auioSettingsDialog.show(e);
    }
    function personalSettings(e){
      personalSettingsDialog.show(e);
    }

    function goTw() {
      $window.location.assign('https://twitter.com/SpeechFlashcard');
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
            $window.location.assign('/');
          });
        });
    }

  }

})();
