(function() {
  'use strict';

  angular
    .module('auth-ng', [])
    .service('authService', AuthService)
    .provider('authService', AuthServiceProvider);

  function AuthServiceProvider() {
    this.$get = function($http) {
      return new AuthService($http)
    };
  }

  function AuthService($http) {

    this.login = function (user) {

    };

  }

})();
