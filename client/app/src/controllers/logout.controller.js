(function () {
  'use strict';

  angular.module('client')
    .controller('LogoutController', function ($auth, $state) {
      $auth.logout();
      $state.go('main');
    });

})();