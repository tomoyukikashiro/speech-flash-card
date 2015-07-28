(function() {

  'use strict';

  angular.module('signup')
    .config(SignupRouter);

  SignupRouter.$inject = ['$routeProvider'];

  function SignupRouter($routeProvider) {
    $routeProvider
      .when('/signup',
          {
            templateUrl: '/templates/signup/index.html',
            controller: 'SignupIndexController',
            controllerAs: 'signupIndex',
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
