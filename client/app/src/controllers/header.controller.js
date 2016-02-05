(function () {
    'use strict';

    angular.module('client')
      .controller('HeaderController', function ($scope, $auth, $window) {
        $scope.isAuthenticated = $auth.isAuthenticated;
        $scope.user = $window.sessionStorage.user;
      });

})();
