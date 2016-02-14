'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('ContactUsCtrl', function($scope, $mdToast, $animate){
    $scope.title = "Contact Us"
    //$scope.subTitle = "If you would like to join our team or have a question feel free to send us a message to our general email. Fill out the form below and one of our staff members will get back to you."
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

    this.sendMail = function() {
        $mdToast.show(
            $mdToast.simple()
                .content('Thanks for your Message ' + this.contactName)
                .position($scope.getToastPosition())
                .hideDelay(3000)
        );
    };

  })
