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
        ['$q', '$rootScope', 'tokenStorageService', function($q, $rootScope, tokenStorageService) {
        return {
          request: function(config) {
            if (config.url.indexOf(that.config.baseUrl) === 0 && tokenStorageService.has()) {
              config.headers[that.config.headerName] = that.config.headerPrefix + tokenStorageService.get();
            }
            return config || $q.when(config);
          },
          responseError: function (rejection) {
            if (rejection.status === 401) {
              $rootScope.$emit('auth-ng:loginRequired');
            }
            return $q.reject(rejection)
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

    this.logout = function () {
      tokenStorageService.remove();
    };

  }

})();
