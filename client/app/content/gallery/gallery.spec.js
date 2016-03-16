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
=======
<<<<<<< HEAD
>>>>>>> a309de6498a70c74a943bf86f538a839c073b865

  it('should have defined a gallery', function() {
    expect(scope.gallery).toBeDefined();
  });

<<<<<<< HEAD
  it('should have a title of Gallery', function() {
    expect(scope.title).toEqual('Gallery');
  })

=======
=======
>>>>>>> 3db4f3ad8a6243b7f2af1112b44c7817d74d6c35
>>>>>>> a309de6498a70c74a943bf86f538a839c073b865
});