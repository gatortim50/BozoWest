(function () {
  'use strict';

  angular.module('client')
    .controller('SocketController', function ($scope, $log, $socket, messageFormatter) {
      var socket = this;

      socket.nickName = 'ViaWestCSR';
      socket.messageLog = 'Ready to chat!';

      socket.sendMessage = function(msg) {

        socket.message = msg;
        socket.messageLog = messageFormatter(new Date(), socket.nickName, socket.messageLog);

        $log.debug('sending message', socket.message);
        $socket.emit('message', socket.nickName, socket.message);
        $log.debug('message sent', socket.message);
        socket.message = '';
      };

      $scope.$on('add-album', function(event, data){
        log.debug(data);
      });

      $scope.$on('socket:broadcast', function(event, data) {
        $log.debug('got a message', event.name);
        if (!data.payload) {
          $log.error('invalid message', 'event', event,
            'data', JSON.stringify(data));
          return;
        }
        $scope.$apply(function() {
          socket.messageLog = messageFormatter(
              new Date(), data.source,
              data.payload) + socket.messageLog;
        });
      });

    });

})();
