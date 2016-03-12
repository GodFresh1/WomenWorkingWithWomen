"use strict";

describe('takeActionPage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('TakeActionCtrl', {
      $scope: scope
    });
  }));

  it('should have defined TakeActionCtrl', function() {
    expect(ctrl).toBeDefined();
  });
});