(function() {
  'use strict';

  describe('authService', function() {
    var $httpBackend, authService, tokenStorageService;
    var config = {
      baseUrl: 'http://test.com',
      loginPath: '/auth/login',
      tokenKey: 'token'
    };

    beforeEach(module('auth-ng', function (authServiceProvider) {
      authServiceProvider.configure(config);
    }));

    beforeEach(inject(function(_authService_,  _$httpBackend_, _tokenStorageService_) {
      authService = _authService_;
      $httpBackend =  _$httpBackend_;
      tokenStorageService = _tokenStorageService_;
    }));

    it('should login user', function() {
      var user = {
        'username': 'test',
        'password': 'test'
      };
      var response = {
        token: '1234'
      };
      $httpBackend.expectPOST(config.baseUrl + config.loginPath, user).respond(200, response);

      authService.login(user);

      $httpBackend.flush();
      expect(tokenStorageService.get()).toBe(response.token);
    });

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });

  });
})();
