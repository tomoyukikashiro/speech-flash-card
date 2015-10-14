(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksCreateDialogController', booksCreateDialogController);

  booksCreateDialogController.$inject = ['resourceBook', 'baseController', '$mdDialog', 'speech', 'commonDialog'];

  function booksCreateDialogController(resourceBook, baseController, $mdDialog, speech, commonDialog) {
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
      }, function(response) {
        if(resourceBook.isTooManyBook(response.data)){
          commonDialog.alert({content: 'Bookはこれ以上つくれません'});
        }
      });
    }
  }

})();
