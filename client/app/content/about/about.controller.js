'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('AboutCtrl', ['$scope', "BoardMembers", "Testimonials", "Partners", function($scope, BoardMembers, Testimonials, Partners){
    $scope.boardMembers = BoardMembers.members;
    $scope.testimonials = Testimonials;
    $scope.partners = Partners;
  }]);
