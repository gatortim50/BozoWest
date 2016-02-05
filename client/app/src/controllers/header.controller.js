(function () {
    'use strict';

    angular.module('client')
      .controller('HeaderController', function ($scope, $auth, $window) {
        $scope.isAuthenticated = $auth.isAuthenticated;
        if ($window.localStorage.user) {
          $scope.user = $window.localStorage.user;
        }
      });

})();
