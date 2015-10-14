(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('commonDialog', commonDialog);

  commonDialog.$inject = ['$mdDialog'];

  function commonDialog($mdDialog) {

    return {
      alert: alert
    };

    ///
    function alert(param) {
      var custom = $mdDialog.alert({
        title: param.title || 'ATTENTION',
        content: param.content,
        ok: param.ok || 'Close'
      });
      $mdDialog.show(custom);
    }
  }
})();
