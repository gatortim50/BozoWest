(function () {
  'use strict';

  angular.module('client')
    .controller('LoginController', function (alert, $auth, $state) {
      var login = this;

      login.submit = function () {
        $auth.login({
            email: login.email,
            password: login.password
          })
          .then(function (res) {
            alert('success', 'Welcome!', 'Thanks for coming back, ' + res.data.user.email + '!');
            $state.go('main');
          })
          .catch(handleError);
      };

      login.authenticate = function (provider) {
        $auth.authenticate(provider).then(function (res) {
          alert('success', 'Welcome!', 'Thanks for coming back, ' + res.data.user.displayName + '!');
          $state.go('main');
        }, handleError);
      };

      function handleError(err) {
        alert('warning', 'Something went wrong :(', err.message);
      }

    });
})();