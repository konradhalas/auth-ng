(function() {
  'use strict';

  describe('authService', function() {
    var $http, $httpBackend, $rootScope, authService, tokenStorageService;
    var config = {
      baseUrl: 'http://test.com',
      loginPath: '/auth/login',
      tokenKey: 'token',
      headerName: 'Authorization',
      headerPrefix: 'Token '
    };

    beforeEach(module('auth-ng', function (authServiceProvider) {
      authServiceProvider.configure(config);
    }));

    beforeEach(inject(function(_$http_, _$httpBackend_, _$rootScope_, _authService_, _tokenStorageService_) {
      $http = _$http_;
      $httpBackend =  _$httpBackend_;
      $rootScope = _$rootScope_;
      authService = _authService_;
      tokenStorageService = _tokenStorageService_;
    }));

    it('should obtain and store token', function() {
      var user = {
        'username': 'test',
        'password': 'test'
      };
      var response = {
        token: '1234'
      };
      var spy = jasmine.createSpyObj('spy', ['callback']);
      $httpBackend.expectPOST(config.baseUrl + config.loginPath, user).respond(200, response);

      authService.login(user).then(spy.callback);

      $httpBackend.flush();
      expect(tokenStorageService.get()).toBe(response.token);
      expect(spy.callback).toHaveBeenCalled()
    });

    it('should add token to request headers', function () {
      var token = '1234';
      tokenStorageService.set(token);
      $httpBackend.expectPOST(config.baseUrl, undefined, function(headers) {
        return headers[config.headerName] === config.headerPrefix + token;
      }).respond(200);

      $http.post(config.baseUrl);

      $httpBackend.flush();
    });

    it('should remove token', function () {
      tokenStorageService.set('1234');

      authService.logout();

      expect(tokenStorageService.has()).toBeFalsy();
    });

    it('should emit login required event', function () {
      $httpBackend.expectPOST(config.baseUrl).respond(401);
      spyOn($rootScope, '$emit');

      $http.post(config.baseUrl);

      $httpBackend.flush();
      expect($rootScope.$emit).toHaveBeenCalledWith('auth-ng:loginRequired');
    });

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });

  });
})();
