'use strict';

describe('Controller: LogoutController', function () {

  // load the controller's module
  beforeEach(module('client'));

  var LogoutController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogoutController = $controller('LogoutController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LogoutController.awesomeThings.length).toBe(3);
  });
});
