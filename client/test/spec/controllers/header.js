'use strict';

describe('Controller: HeaderController', function () {

  // load the controller's module
  beforeEach(module('client'));

  var HeaderController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderController = $controller('HeaderController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list to the scope', function () {
    expect(HeaderController.awesomeThings.length).toBe(3);
  });
});
