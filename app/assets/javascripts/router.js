(function() {

  'use strict';

  angular.module('EnglishFlashCard')
    .config(appRouter);

  appRouter.$inject = ['$routeProvider', '$locationProvider'];

  function appRouter($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/login',
          {
            templateUrl: '/templates/login/index.html',
            controller: 'loginController',
            controllerAs: 'loginIndex',
            resolve: {
              currentUser: ['resourceUser',function(resourceUser) {return resourceUser.checkCurrent()}]
            }
          }
      )
      .when('/signup',
          {
            templateUrl: '/templates/signup/index.html',
            controller: 'signupController',
            controllerAs: 'signupIndex',
            resolve: {
              currentUser: ['resourceUser',function(resourceUser) {return resourceUser.checkCurrent()}]
            }
          }
      )
      .when('/books',
          {
            templateUrl: '/templates/books/list.html',
            controller: 'booksListController',
            controllerAs: 'booksList',
            resolve: {
              books: ['resourceBook', function(resourceBook) {return resourceBook.getList()}]
            }
          })
      .when('/books/:bookId/cards/:cardId',
        {
          templateUrl: '/templates/cards/detail.html',
          controller: 'cardsDetailController',
          controllerAs: 'cardsDetail',
          resolve: {
            card: ['resourceCard', function(resourceCard) {return resourceCard.getCard()}]
          }
        })
      .otherwise({redirectTo: '/login'});
  }

})();
