(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksEditDialogController', booksEditDialogController);

  booksEditDialogController.$inject = ['$mdDialog', 'resourceBook', 'baseController', 'book', 'speech', 'commonToast', 'analytics'];

  function booksEditDialogController($mdDialog, resourceBook, baseController, book, speech, commonToast, analytics) {
    angular.extend(this, baseController);
    var vm = this;
    vm.book = book;
    vm.remove = remove;
    vm.update = update;
    vm.speech = speech;
    vm.selectedVoice = '';

    activate();

    function activate() {
      analytics.sendCurrentPageView('/books/edit/');
      // 保存しているvoiceの中でブラウザに合うものを取得
      var selectedVoice = speech.getSelectedVoiceData(book.voices);
      if(selectedVoice){
        vm.selectedVoice = speech.getVoiceKey(selectedVoice.lang, selectedVoice.name);
      }
    }

    function remove() {
      resourceBook.remove(book.id)
        .then(function() {
          $mdDialog.hide();
          commonToast.notice({notice: 'deleted book'});
        });
    }
    function update() {
      var param = {
        name: vm.book.name,
        voices: speech.getVoiceParam(vm.selectedVoice)
      };
      resourceBook.update(book.id, param)
        .then(function() {
          $mdDialog.hide();
          commonToast.notice({notice: 'updated book'});
        });
    }
  }

})();
