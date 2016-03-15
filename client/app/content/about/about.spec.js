"use strict";

describe('aboutPage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('should have defined AboutCtrl', function() {
    expect(ctrl).toBeDefined();
  });
<<<<<<< HEAD

=======
>>>>>>> 3db4f3ad8a6243b7f2af1112b44c7817d74d6c35
});