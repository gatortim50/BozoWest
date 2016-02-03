'use strict';

describe('Controller: RegisterController', function () {

  // load the controller's module
  beforeEach(module('client'));

  var RegisterController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterController = $controller('RegisterController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RegisterController.awesomeThings.length).toBe(3);
  });
});
