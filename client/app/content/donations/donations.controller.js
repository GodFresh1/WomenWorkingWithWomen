'use strict';

angular.module('womenWorkingWithWomenApp')
<<<<<<< Updated upstream
  .controller('DonationsCtrl', function($scope){
    $scope.title = "Donate"
    $scope.subtitle = "Be the change you want to see"
  })
=======
  .controller('DonationsCtrl', ['$scope', "DonationLevels", 'Api', function($scope, DonationLevels, Api){
  	$scope.donationLevels = DonationLevels;
    $scope.donation = {};
    $scope.email = "4wsbms@gmail.com";
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
>>>>>>> Stashed changes
