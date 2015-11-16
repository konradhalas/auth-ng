(function() {
  'use strict';

  angular
    .module('auth-ng', [])
    .service('authService', AuthService)
    .provider('authService', AuthServiceProvider);

  function AuthServiceProvider() {
    this.configure = function (config) {
      this.config = config;
    };

    this.$get = function($http, tokenStorageService) {
      return new AuthService($http, tokenStorageService, this.config)
    };
  }

  function AuthService($http, tokenStorageService, config) {

    this.login = function (credentials) {
      $http.post(config.baseUrl + config.loginPath, credentials).then(function (response) {
        tokenStorageService.set(response.data[config.tokenKey]);
      });
    };

  }

})();
