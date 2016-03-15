"use strict";

describe('galleryPage', function(){
  beforeEach(module('womenWorkingWithWomenApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('GalleryCtrl', {
      $scope: scope
    });
  }));

  it('should have defined GalleryCtrl', function() {
    expect(ctrl).toBeDefined();
  });
<<<<<<< HEAD

  it('should have defined a gallery', function() {
    expect(scope.gallery).toBeDefined();
  });

=======
>>>>>>> 3db4f3ad8a6243b7f2af1112b44c7817d74d6c35
});