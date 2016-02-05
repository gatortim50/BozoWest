(function () {
  'use strict';

  angular.module('client')
    .controller('RegisterController', function ($scope, alert, $auth, $state, $window) {

      $scope.submit = function () {
        $auth.signup({
            email: $scope.email,
            password: $scope.password
          })
          .then(function (res) {
            $auth.setToken(res);
            alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!');
            $window.localStorage.user = res.data.user.email;
            console.log('register:', $window.localStorage.user);
            $state.go('main');
          })
          .catch(function (err) {
            alert('warning', 'Something went wrong :(', err.message);
          });
      };

    });

})();