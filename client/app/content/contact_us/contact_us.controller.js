'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('ContactUsCtrl', ['$scope', '$mdToast', '$animate', 'Api', '$window', function($scope, $mdToast, $animate, Api, $window){
    $scope.title = "Contact Us"
    //$scope.subTitle = "If you would like to join our team or have a question feel free to send us a message to our general email. Fill out the form below and one of our staff members will get back to you."
    $scope.request = {};

    $scope.contactMsgBody = ""
    $scope.contactMsgSubject = ""
    $scope.contactPhoneNumber = ""
    $scope.contactEmail = ""
    $scope.contactName = ""
    $scope.toastPosition = {
                bottom: true,
                top: true,
                left: true,
                right: true
            };

    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

    $scope.sendContactRequest = function(){
      Api.contactRequest($scope.request);
      $scope.request = {};
      $window.scrollTo(0, 0);
      $mdToast.show(
        $mdToast.simple()
          .content('Contact Request Sent!')
          .position('top right')
          .hideDelay(3000)
          .theme("success-toast")
      );
    }
  }]);
