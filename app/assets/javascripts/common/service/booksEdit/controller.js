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
    vm.voices = speech.getVoices();
    var selectedVoiceData = speech.getSelectedVoiceData(book.voices);
    vm.isSelectedVoice = isSelectedVoice;

    activate();

    function activate() {
      analytics.sendCurrentPageView('/books/edit/');
    }

    function isSelectedVoice(data){
      return data === selectedVoiceData;
    }

    function remove() {
      resourceBook.remove(book.id)
        .then(function() {
          $mdDialog.hide();
          commonToast.notice({notice: 'deleted book'});
        });
    }
    function update() {
      var voice = speech.getVoiceParam(vm.selectedVoice);
      var param = {
        name: vm.book.name,
        voices: voice
      };
      resourceBook.update(book.id, param)
        .then(function() {
          $mdDialog.hide();
        });
    }
  }

})();
