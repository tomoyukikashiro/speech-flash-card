(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksCreateDialogController', booksCreateDialogController);

  booksCreateDialogController.$inject = ['resourceBook', 'baseController', '$mdDialog', 'speech', 'commonDialog', 'commonToast', 'isFirst', 'analytics'];

  function booksCreateDialogController(resourceBook, baseController, $mdDialog, speech, commonDialog, commonToast, isFirst, analytics) {
    angular.extend(this, baseController);
    var vm = this;
    var selectedVoice;
    vm.submit = submit;
    vm.voices = speech.getVoices();
    vm.speech = speech;
    vm.isFirst = isFirst;
    vm.onSelect = onSelect;

    activate();

    function onSelect(voice) {
      selectedVoice = voice;
    }

    function activate() {
      analytics.sendCurrentPageView('/books/create/');
    }

    ////
    function submit() {
      var param = {
        book: {
          name: vm.bookName,
          voices: speech.getVoiceParam(selectedVoice.lang, selectedVoice.name)
        }
      };
      resourceBook.save(param).then(function(response) {
        $mdDialog.hide();
        commonToast.notice({notice: 'created book'});
      }, function(response) {
        if(resourceBook.isTooManyBook(response.data)){
          commonDialog.alert({content: 'Bookはこれ以上つくれません'});
        }
      });
    }
  }

})();
