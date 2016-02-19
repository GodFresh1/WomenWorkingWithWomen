'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('GalleryCtrl', ['$scope', 'Gallery', function($scope, Gallery){
    $scope.gallery = Gallery;
    console.log($scope.gallery[0].imgUrl);    
    $scope.title = "Gallery"
  }])
  
