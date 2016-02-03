(function () {
  'use strict';

  angular.module('client')
    .controller('SocketController', function ($socket) {
      var vm = this;

      $socket.on('echo', function (data) {
        vm.serverResponse = data;
      });

      vm.emitBasic = function emitBasic() {
        console.log("emitBasic", vm.dataToSend);
        $socket.emit('echo', vm.dataToSend);
        vm.dataToSend = '';
      };

      vm.emitACK = function emitACK() {
        console.log("emitACK", vm.dataToSend);
        $socket.emit('echo-ack', vm.dataToSend, function (data) {
          vm.serverResponseACK = data;
        });
        vm.dataToSend = '';
      };


    });

})();
