(function() {
  'use strict';

  angular
    .module('auth-ng')
    .service('tokenStorageService', TokenStorageService);

  function TokenStorageService($window) {
    var TOKEN_KEY = 'auth_token';

    this.set = function(token) {
      return $window.localStorage.setItem(TOKEN_KEY, token);
    };

    this.remove = function() {
      return $window.localStorage.removeItem(TOKEN_KEY);
    };

    this.get = function() {
      return $window.localStorage.getItem(TOKEN_KEY);
    };

    this.has = function() {
      return $window.localStorage !== null && this.get() !== null;
    };
  }
})();
