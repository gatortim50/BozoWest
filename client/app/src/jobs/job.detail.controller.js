(function () {
  'use strict';

  angular.module('client')
    .controller('JobDetailController', JobDetailController);

  /** @ngInject */
  function JobDetailController(alert, $stateParams, $state, JobsService) {
    var vm = this;

    console.log('JobDetailController params', $stateParams.jobId);
    console.log('JobDetailController state', $state);
    vm.id = $stateParams.jobId;

    var onComplete = function(data){
      vm.job = data;
      vm.name = data[0].name;
    };

    var onError = function(reason){
      vm.error = reason;
      alert('warning', 'Unable to get product', vm.reason);
    };

    JobsService.getJob(vm.id)
      .then(onComplete, onError);

  }

})();
