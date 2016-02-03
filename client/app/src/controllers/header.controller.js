(function () {
    'use strict';

    angular.module('client')
      .controller('HeaderController', function ($scope, $auth) {
          $scope.isAuthenticated = $auth.isAuthenticated;
      });

})();
