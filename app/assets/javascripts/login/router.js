(function() {

  'use strict';

  angular.module('login')
    .config(LoginRouter);

  LoginRouter.$inject = ['$routeProvider'];

  function LoginRouter($routeProvider) {
    $routeProvider
      .when('/login',
          {
            templateUrl: '/templates/login/index.html',
            controller: 'LoginIndexController',
            controllerAs: 'loginIndex',
            resolve: {
              currentUser: ['CommonResourceUser', 'CommonResolveRedirection', 'CommonRouterBook',
                function(CommonResourceUser, CommonResolveRedirection, CommonRouterBook) {
                  return CommonResolveRedirection.redirect(
                      CommonResourceUser.checkCurrent(),
                      CommonRouterBook.getList().substring(1)
                  );
                }
              ]
            }
          }
      );
  }

})();
