'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('DonationsCtrl', ['$scope', "DonationLevels", function($scope, DonationLevels){
  	$scope.donationLevels = DonationLevels;
  }]);
