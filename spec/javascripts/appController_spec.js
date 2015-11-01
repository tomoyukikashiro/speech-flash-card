(function() {
  'use strict';

  describe('appController.js', function(){

    // api リクエスト確認はレスポンスが通常とは違うので調査が必要

    beforeEach(module('SpeechFlashCard'));
    var ctrl, _$rootScope, _$route, _$httpBackend;
    beforeEach(inject(function($httpBackend, $route, $controller, $rootScope, baseController, APP_CONFIG, cardList, resourceCard) {
      _$rootScope = $rootScope;
      _$route = $route;
      _$httpBackend = $httpBackend;
      // pass template and user api request
      //_$httpBackend.whenGET(/[template.*|api\/user]/).respond(200, '');
      ctrl = $controller('appController', {
        $rootScope: $rootScope,
        baseController: baseController,
        APP_CONFIG: APP_CONFIG,
        cardList: [],
        resourceCard: resourceCard
      });
    }));

    describe('#onUpdateCard', function(){
      it('cache list', function(){
        var list = [];
        _$rootScope.$emit('updatecard', list);
        expect(ctrl.cardListData).to.eql(list);
      });
    });

    describe('#onPageChange', function(){
      it('page is card set pageName and get cardList', function(){
        ctrl.page.name = 'cards';
        _$route.current = {params: {cardId: '111', bookId: '111'}};
        //_$httpBackend
        //  .when('GET', '/api/books/111/cards')
        //  .respond({data: {list: [{id: '111', text: '111'}]}});

        _$rootScope.$emit('pagechange', {name: 'cards'});
        //_$httpBackend.flush();

        //_$httpBackend.expectGET('/api/books/111/cards');
        expect(ctrl.page.preName).to.eql('books > ');
      });
      it('page is book set pageName', function(){
        _$rootScope.$emit('pagechange', {name: 'book'});
        expect(ctrl.page.preName).to.eql('');
      });
    });

  });
})();
