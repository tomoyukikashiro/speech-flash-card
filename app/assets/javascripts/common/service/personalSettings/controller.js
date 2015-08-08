(function() {
  'use strict';

  angular
    .module('common.service.personalSettings.dialog')
    .controller('CommonServicePersonalSettingsDialogController', CommonServicePersonalSettingsDialogController);

  CommonServicePersonalSettingsDialogController.$inject = ['CommonControllerBaseController', 'CommonResourceUser', '$mdDialog'];

  function CommonServicePersonalSettingsDialogController(CommonControllerBaseController, CommonResourceUser, $mdDialog) {
    angular.extend(this, CommonControllerBaseController);
    var orgUserData = CommonResourceUser.getData();
    var vm = this;
    vm.user = {
      name     : orgUserData.name,
      email    : '',
      password1: '',
      password2: ''
    };
    vm.submit = submit;

    function submit(key){
      var param = getUpdateParam(key);
      if(!param){
        return;
      }
      CommonResourceUser.resource.update({id: orgUserData.id}, param).$promise
        .then(function(){
          $mdDialog.hide();
        }, function(e){
          console.log(e);
        });
    }

    function getUpdateParam(form) {
      // TODO カスタムバリデーションでpasswordが2つ正しいことを確認
      if(form.$invalid){
        return;
      }
      if(form.$name === 'name'){
        return {name: form.name.$modelValue};
      }else if(form.$name === 'email'){
        return {email: form.email.$modelValue};
      }else if(form.$name === 'password'){
        if(form.password1.$modelValue === form.password2.$modelValue){
          return {password: form.password1.$modelValue};
        }
      }
    }
  }

})();
