(function () {
  'use strict';

  angular
    .module('client', [
      'ui.router',
      'ngAnimate',
      'satellizer',
      'btford.socket-io'
    ])

  .value('messageFormatter', function(date, nickName, message) {
    return date.toLocaleTimeString() + ' - ' +
      nickName + ' - ' +
      message + '\n';
  });

})();
