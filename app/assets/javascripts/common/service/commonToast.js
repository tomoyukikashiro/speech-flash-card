(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('commonToast', commonToast);

  commonToast.$inject = ['$mdToast'];

  function commonToast($mdToast) {

    return {
      notice: notice
    };

    // flashは noticeやalertなどの幾つか入る可能性がある
    // rails の flashに準拠
    // {notice: '', alert: ''}
    function notice(flash) {
      var data = getSimpleConfig(getKeyData('notice', flash));
      angular.forEach(data, function(v) {
        $mdToast.show(v);
      });
    }

    function getSimpleConfig(data) {
      var res = [];
      angular.forEach(data, function(v) {
        res.push($mdToast.simple()
            .content(v)
            .hideDelay(3000)
        );
      });
      return res;
    }

    function getKeyData(key, flash) {
      var res = [];
      angular.forEach(flash, function(v, k) {
        if(k === key){
          res.push(v);
        }
      });
      return res;
    }
  }
})();
