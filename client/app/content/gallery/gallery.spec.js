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

  it('should have defined a gallery', function() {
    expect(scope.gallery).toBeDefined();
  });

  it('should have a title of Gallery', function() {
    expect(scope.title).toEqual('Gallery');
  })

});