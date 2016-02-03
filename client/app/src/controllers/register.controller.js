(function () {
  'use strict';

  angular.module('client')
    .controller('RegisterController', function ($scope, alert, $auth, $state) {

      $scope.submit = function () {
        $auth.signup({
            email: $scope.email,
            password: $scope.password
          })
          .then(function (res) {
            $auth.setToken(res);
            alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!');
            $state.go('main');
          })
          .catch(function (err) {
            alert('warning', 'Something went wrong :(', err.message);
          });
      };

    });

})();