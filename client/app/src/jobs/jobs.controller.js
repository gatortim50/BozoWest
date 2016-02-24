(function () {
  'use strict';

  angular.module('client')
    .controller('JobsController', function ($stateParams, JobsService, alert) {
      var vm = this;
      vm.serviceId = $stateParams.id;
      console.log('id: ', vm.serviceId);
      vm.activate = activate;

      var onComplete = function(data){
        vm.jobs = data;
        console.log('jobs', vm.jobs);
      };

      var onError = function(reason){
        vm.error = reason;
        alert('warning', 'Unable to get product', vm.reason);
      };

      function activatex() {
        JobsService.getJobs()
          .then(onComplete, onError);
      }

      function activate() {
        JobsService.getJob(1)
          .then(onComplete, onError);
      }

      activate();

    });

})();
