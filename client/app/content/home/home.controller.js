'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('HomeCtrl', function($scope){
  	$scope.pretitle = "Empowering Women."
    $scope.title = "Changing Lives."
    $scope.subtitle = "Making a Difference."
  })
$(document).ready(function () {
    // Plugin initialization
    $('.slider').slider();
})