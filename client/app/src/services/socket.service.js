(function () {
  'use strict';

  angular.module('client')
    .factory('$socket', function (socketFactory, API_URL) {

      var myIoSocket = io.connect(API_URL);

      var mySocket = socketFactory({
        ioSocket: myIoSocket
      });

      return mySocket;

    });

})();