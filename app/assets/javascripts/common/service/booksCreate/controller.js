(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('booksCreateDialogController', booksCreateDialogController);

  booksCreateDialogController.$inject = ['resourceBook', 'baseController', '$mdDialog', 'speech', 'commonDialog', 'commonToast', 'isFirst', 'analytics'];

  function booksCreateDialogController(resourceBook, baseController, $mdDialog, speech, commonDialog, commonToast, isFirst, analytics) {
    angular.extend(this, baseController);
    var vm = this;
    vm.selectedVoice = '';
    vm.submit = submit;
    vm.speech = speech;
    vm.isFirst = isFirst;

    activate();

    function activate() {
      analytics.sendCurrentPageView('/books/create/');
    }

    ////
    function submit() {
      var param = {
        book: {
          name: vm.bookName,
          voices: speech.getVoiceParam(vm.selectedVoice)
        }
      };
      resourceBook.save(param).then(function() {
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
