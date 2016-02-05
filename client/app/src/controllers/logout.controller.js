(function () {
  'use strict';

  angular.module('client')
    .controller('LogoutController', function ($auth, $state, $window) {
      $auth.logout();
      if ($window.localStorage.user) {
        $window.localStorage.user = null;
      }
      $state.go('main');
    });

})();