'use strict';

describe('Controller: JobsController', function () {

  // load the controller's module
  beforeEach(module('client'));

  var JobsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobsController = $controller('JobsController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobsController.awesomeThings.length).toBe(3);
  });
});
