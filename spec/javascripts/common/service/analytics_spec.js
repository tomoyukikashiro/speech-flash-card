(function() {

  'use strict';
  describe('common/service/analytics.js', function(){
    var _analytics, _$location, spy;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(inject(function(analytics, $location) {
      _analytics = analytics;
      _$location = $location;

      window.ga = function() {};
      spy = sinon.stub(window, 'ga');
    }));
    afterEach(function(){
      spy.restore();
    });

    describe('#sendCurrentPageView', function(){
      describe('with path param', function(){
        it('call sendCurrentPageView', function(){
          _analytics.sendCurrentPageView('/books/');
          expect(spy.calledWith('send', 'pageview', '/books/')).to.be.ok();
        });
      });
      describe('with no path param', function(){
        var locationSpy, path;
        beforeEach(function(){
          path = _$location.path();
          locationSpy = sinon.spy(_$location, 'path');
        });
        afterEach(function(){
          locationSpy.restore();
        });
        it('call sendCurrentPageView and $location.path', function(){
          _analytics.sendCurrentPageView();
          expect(spy.calledWith('send', 'pageview', path)).to.be.ok();
          expect(locationSpy.called).to.be.ok();
        });
      });
    });
  });

})();
