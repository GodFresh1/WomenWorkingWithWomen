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
=======
<<<<<<< HEAD
>>>>>>> a309de6498a70c74a943bf86f538a839c073b865

  it('should have defined eventSources and uiConfig', function() {
    expect(scope.eventSources).toBeDefined();
    expect(scope.uiConfig).toBeDefined();
  });
<<<<<<< HEAD

  it('should have triggered alerts', function() {

  });

  it('should add and remove event sources', function() {

  });

  it('should add an event', function() {

  });

  it('should delete an event', function() {

  });

  it('should change calendar view', function() {

  });

  it('should render calendar and events', function() {

  });
=======
=======
>>>>>>> 3db4f3ad8a6243b7f2af1112b44c7817d74d6c35
>>>>>>> a309de6498a70c74a943bf86f538a839c073b865
});