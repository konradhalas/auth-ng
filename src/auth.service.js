(function() {
  'use strict';

  angular
    .module('auth-ng', [])
    .service('authService', AuthService)
    .provider('authService', AuthServiceProvider);

  function AuthServiceProvider($httpProvider) {
    var that = this;

    var configureInterceptors = function () {
      $httpProvider.interceptors.push(
        ['$q', '$location', 'tokenStorageService', function($q, $location, tokenStorageService) {
        return {
          request: function(config) {
            if (config.url.indexOf(that.config.baseUrl) === 0 && tokenStorageService.has()) {
              config.headers[that.config.headerName] = that.config.headerPrefix + tokenStorageService.get();
            }
            return config || $q.when(config);
          }
        };
      }]);
    };

    this.configure = function (config) {
      this.config = config;
      configureInterceptors();
    };

    this.$get = function($http, tokenStorageService) {
      return new AuthService($http, tokenStorageService, this.config)
    };
  }

  function AuthService($http, tokenStorageService, config) {

    this.login = function (credentials) {
      return $http.post(config.baseUrl + config.loginPath, credentials).then(function (response) {
        tokenStorageService.set(response.data[config.tokenKey]);
      });
    };

  }

})();
