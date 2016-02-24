(function () {
  'use strict';

  angular
    .module('client')
    .config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: '/views/main.html'
        })
        .state('services', {
          url: '/services',
          templateUrl: 'src/jobs/jobs.html',
          controller: 'JobsController',
          controllerAs: 'service'
        })
        .state('services-detail', {
          url: '/services-detail/:id',
          //templateUrl: '/views/jobs.html',
          template: 'detail',
          controller: 'JobsController'
        })
        .state('register', {
          url: '/register',
          templateUrl: '/views/register.html',
          controller: 'RegisterController'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })
        .state('socket', {
          url: '/socket',
          templateUrl: 'src/sockets/socket.html',
          controller: 'SocketController',
          controllerAs: 'socket'
        })
        .state('logout', {
          url: '/logout',
          controller: 'LogoutController'
        });

      $authProvider.loginUrl = API_URL + 'login';
      $authProvider.signupUrl = API_URL + 'register';

      $authProvider.google({
        clientId: '1030168378302-l7b0nbkh5lu1cssjq5tdfok06ftes9jk.apps.googleusercontent.com',
        url: API_URL + 'auth/google'
      });

      $httpProvider.interceptors.push('authInterceptor');

    })

    .constant('API_URL', 'http://localhost:8000/')

    .run(function ($window) {
      var params = $window.location.search.substring(1);

      if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);

        $window.opener.postMessage(code, $window.location.origin);
      }
    });

})();