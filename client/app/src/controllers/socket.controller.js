(function () {
  'use strict';

  angular.module('client')
    .controller('SocketController', function ($scope, $log, $socket, messageFormatter) {


      $scope.nickName = 'ViaWestCSR';
      $scope.messageLog = 'Ready to chat!';

      $scope.sendMessage = function(msg) {
        console.log(msg);

        $scope.message = msg;
        $scope.messageLog = messageFormatter(new Date(), $scope.nickName, $scope.messageLog);

        $log.debug('sending message', $scope.message);
        $socket.emit('message', $scope.nickName, $scope.message);
        $log.debug('message sent', $scope.message);
        $scope.message = '';
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
          $scope.messageLog = messageFormatter(
              new Date(), data.source,
              data.payload) + $scope.messageLog;
        });
      });

    });

})();
