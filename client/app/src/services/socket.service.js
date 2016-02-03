(function () {
  'use strict';

  angular.module('client')
    .factory('$socket', function (socketFactory) {
      return socketFactory();
    });

})();