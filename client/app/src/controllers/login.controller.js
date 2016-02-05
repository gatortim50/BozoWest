(function () {
  'use strict';

  angular.module('client')
    .controller('LoginController', function ($scope, alert, $auth, $state, $window) {

      $scope.submit = function () {
        $auth.login({
            email: $scope.email,
            password: $scope.password
          })
          .then(function (res) {
            $window.localStorage.user = res.data.user.email;
            console.log('login:', $window.localStorage.user);
            alert('success', 'Welcome!', 'Thanks for coming back, ' + res.data.user.email + '!');
            $state.go('main');
          })
          .catch(handleError);
      };

      $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function (res) {
          $window.localStorage.user = res.data.user.displayName;
          console.log('login:', $window.localStorage.user);
          alert('success', 'Welcome!', 'Thanks for coming back, ' + res.data.user.displayName + '!');
          $state.go('main');
        }, handleError);
      };

      function handleError(err) {
        alert('warning', 'Something went wrong :(', err.message);
      }

    });
})();