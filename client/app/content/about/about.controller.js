'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('AboutCtrl', ['$scope', "BoardMembers", "Testimonials", "Partners", "Api", "$mdToast", "$window", function($scope, BoardMembers, Testimonials, Partners, Api, $mdToast, $window){
    $scope.boardMembers = BoardMembers.members;
    $scope.testimonials = Testimonials;
    $scope.partners = Partners;
    $scope.newPartner = {};

    $scope.becomeAPartner = function(){
      console.log($scope.newPartner);
      Api.partnerRequest($scope.newPartner).then(function(res){
        $scope.newPartner = {};
        $window.scrollTo(0, 0);
        $mdToast.show(
          $mdToast.simple()
            .content('Partner Request Sent!')
            .position('top right')
            .hideDelay(3000)
            .theme("success-toast")
        );
      }, function(err){
        $scope.newPartner = {};
        $window.scrollTo(0, 0);
        $mdToast.show(
          $mdToast.simple()
            .content('Ooops An Error Occurred!')
            .position('top right')
            .hideDelay(3000)
            .theme("error-toast")
        );
      });
    }
  }]);
