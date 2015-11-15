(function() {
  'use strict';

  angular
    .module('auth-ng', [])
    .service('authService', AuthService)
    .provider('authService', AuthServiceProvider);

  function AuthServiceProvider($httpProvider) {}

  function AuthService() {}

})();
