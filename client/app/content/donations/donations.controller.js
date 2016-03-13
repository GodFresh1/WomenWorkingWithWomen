'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('DonationsCtrl', ['$scope', "DonationLevels", function($scope, DonationLevels){
  	$scope.donationLevels = DonationLevels;
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.amount = "";
    
  }]);
