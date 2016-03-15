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
<<<<<<< HEAD

  it('should have defined eventSources and uiConfig', function() {
    expect(scope.eventSources).toBeDefined();
    expect(scope.uiConfig).toBeDefined();
  });
=======
>>>>>>> 3db4f3ad8a6243b7f2af1112b44c7817d74d6c35
});