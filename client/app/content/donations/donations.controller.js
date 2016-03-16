'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('DonationsCtrl', ['$scope', "DonationLevels", 'Api', function($scope, DonationLevels, Api){
  	$scope.donationLevels = DonationLevels;
    $scope.donation = {};

    $scope.addDonation = function(){
      if($scope.donation.amount <= 100){
        $scope.donation.level = "sapphire";
      }else if($scope.donation.amount > 100 && $scope.donation.amount <= 499){
        $scope.donation.level = "emerald";
      }else if($scope.donation.amount > 500 && $scope.donation.amount <= 999){
        $scope.donation.level = "ruby";
      }else if($scope.donation.amount >= 1000){
        $scope.donation.level = "diamond";
      }
      Api.createDonation($scope.donation).then(function(response){
        console.log("Response");
        console.log(response);
        var form = document.getElementById('paypalForm');
        form.action = 'https://www.paypal.com/cgi-bin/webscr';
        form.method = 'post';
        form.target = '';
        form.submit();
      }, function(error){
        console.log(error);
      });
    };
  }]);
