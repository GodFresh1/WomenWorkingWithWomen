"use strict";

describe('donationsPage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('DonationsCtrl', {
      $scope: scope
    });
  }));

  it('should have defined DonationsCtrl', function() {
    expect(ctrl).toBeDefined();
  });
});