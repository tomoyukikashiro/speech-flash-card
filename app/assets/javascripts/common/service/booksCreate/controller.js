(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksCreateDialogController', booksCreateDialogController);

  booksCreateDialogController.$inject = ['resourceBook', 'baseController', '$mdDialog', 'speech'];

  function booksCreateDialogController(resourceBook, baseController, $mdDialog, speech) {
    angular.extend(this, baseController);
    var vm = this;
    vm.submit = submit;
    vm.voices = speech.getVoices();

    ////
    function submit() {
      var param = {
        book: {
          name: vm.bookName,
          voices: speech.getVoiceParam(vm.selectedVoice)
        }
      };
      resourceBook.resource.save({}, param, function(response) {
        $mdDialog.hide();
      });
    }
  }

})();
