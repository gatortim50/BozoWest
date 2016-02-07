module.exports = function (io) {
  'use strict';

  var users = [];

  io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {

      users.push({id:socket.id,from:from});
      var len=users.length;
      len--;
      //Sending the user Id and List of users
      io.emit('user entrance',users,users[len].id);

      console.log('users' + JSON.stringify(users));

      console.log('received message from: ', from, '\t msg: ', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('\t payload is: ', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });

      console.log('broadcast complete');

    });

  });
};
