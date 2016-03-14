"use strict";

describe('homePage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should have defined HomeCtrl', function() {
    expect(ctrl).toBeDefined();
  });
});