(function() {
  'use strict';

  describe('authService', function() {
    var authService, $httpBackend;

    beforeEach(module('auth-ng'));

    beforeEach(inject(function(_authService_,  _$httpBackend_) {
      authService = _authService_;
      $httpBackend =  _$httpBackend_;
    }));

    it('should login user', function() {
      var user = {
        'username': 'test',
        'password': 'test'
      };
      $httpBackend.expectPOST('http://test.com/auth/login', user).respond(200);

      authService.login(user);

      $httpBackend.flush();
      expect(authService.isLoggedIn()).toBeTruthy()
    });

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });

  });
})();
