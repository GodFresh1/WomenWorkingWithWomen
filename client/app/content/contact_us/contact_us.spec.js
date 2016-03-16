"use strict";

describe('contactUsPage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('ContactUsCtrl', {
      $scope: scope
    });
  }));

  it('should have defined ContactUsCtrl', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have title Contact Us', function() {
    expect(scope.title).toEqual('Contact Us');
  });

  it('should have defined attributes', function() {

  });

  it('should get toast position', function() {

  });

  it('should send contact request', function() {

  });
});