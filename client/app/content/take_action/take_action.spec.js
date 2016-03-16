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

  it('should have a title of Take Action', function() {
    expect(scope.title).toEqual('Take Action');
  })
});