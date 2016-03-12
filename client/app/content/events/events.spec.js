"use strict";

describe('eventsPage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('EventsCtrl', {
      $scope: scope
    });
  }));

  it('should have defined EventsCtrl', function() {
    expect(ctrl).toBeDefined();
  });
});