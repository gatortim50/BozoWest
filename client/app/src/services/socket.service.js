(function () {
  'use strict';

  angular.module('client')
    .factory('$socket', function (socketFactory) {

      var myIoSocket = io.connect('localhost:8000');

      var mySocket = socketFactory({
        ioSocket: myIoSocket
      });

      return mySocket;

    });

})();