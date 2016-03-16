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

  it('should have defined eventSources and uiConfig', function() {
    expect(scope.eventSources).toBeDefined();
    expect(scope.uiConfig).toBeDefined();
  });
});