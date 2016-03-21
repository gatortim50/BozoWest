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
        .state('detail', {
          url: '/servicesDetail/:jobId',
          templateUrl: 'src/jobs/jobDetail.html',
          controller: 'JobDetailController',
          controllerAs: 'detail'
          /***
          resolve: {

            job: function ($http, $stateParams) {
              var jobId = $stateParams.jobId;
              var url = API_URL + 'job/' + jobId;
              console.log('url: ' + url);


              return $http.get(url).then(function (response) {
                console.log('response: ', response.data);
                return response.data;
              });

            }
          }
        **/
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
    })

  .run(function ($rootScope, $state, $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    })

  .run(['$rootScope', '$log', function($rootScope, $log) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        $log.debug('successfully changed states');

        $log.debug('event', event);
        $log.debug('toState', toState);
        $log.debug('toParams', toParams);
        $log.debug('fromState', fromState);
        $log.debug('fromParams', fromParams);
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

      $log.error('The requested state was not found: ', unfoundState);

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

      $log.error('An error occurred while changing states: ', error);

      $log.debug('event', event);
      $log.debug('toState', toState);
      $log.debug('toParams', toParams);
      $log.debug('fromState', fromState);
      $log.debug('fromParams', fromParams);
    });

  }]);

})();
