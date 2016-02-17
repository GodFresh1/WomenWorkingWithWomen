'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('AboutCtrl', ['$scope', "BoardMembers", "Testimonials", "Partners", "Api", function($scope, BoardMembers, Testimonials, Partners, Api){
    $scope.boardMembers = BoardMembers.members;
    $scope.testimonials = Testimonials;
    $scope.partners = Partners;
    $scope.newPartner = {};

    $scope.becomeAPartner = function(){
      console.log($scope.newPartner);
      Api.partnerRequest($scope.newPartner);
      $scope.newPartner = {};
    }
  }]);
