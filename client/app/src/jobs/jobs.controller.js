(function () {
  'use strict';

  angular.module('client')
    .controller('JobsController', function (JobsService, alert) {
      var vm = this;

      vm.activate = activate;

      var onComplete = function(data){
        vm.jobs = data;
        console.log('jobs', vm.jobs);
      };

      var onError = function(reason){
        vm.error = reason;
        alert('warning', 'Unable to get product', vm.reason);
      };

      function activate() {
        JobsService.getJobs()
          .then(onComplete, onError);
      }

      activate();


    });

})();
