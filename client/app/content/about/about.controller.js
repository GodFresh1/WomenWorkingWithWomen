'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('AboutCtrl', ['$scope', "BoardMembers", "Testimonials", function($scope, BoardMembers, Testimonials){
    $scope.boardMembers = BoardMembers.members;
    $scope.testimonials = Testimonials;
  }]);
