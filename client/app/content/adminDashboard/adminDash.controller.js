'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AdminDashCtrl', ['$scope', 'Api', '$mdToast', function($scope, Api, $mdToast) {
    $scope.events = [];
    $scope.showDetails = {};



    Api.getAllEvents().then(function(response){
      $scope.events = response.data;
    }, function(err){
      $mdToast.show(
        $mdToast.simple()
          .content('Error: Could not connect to the server. ')
          .position('top right')
          .hideDelay(3000)
          .theme("error-toast")
      );
    });

    $scope.showDetails = function(event){
      var isShown = $scope.showDetails[event._id];
      $scope.showDetails[event._id] = (isShown == undefined || !isShown) ? true : false;
    }

    $scope.checkBox = function(attendee){
      console.log(attendee);
      attendee.checkedIn = true;
      Api.updateAttendee(attendee._id, attendee).then(function(response){
        $mdToast.show(
          $mdToast.simple()
            .content('Check-in succesfull!')
            .position('top right')
            .hideDelay(3000)
            .theme("success-toast")
        );
      }, function(err){
        $mdToast.show(
          $mdToast.simple()
            .content('Error: Could not check-in attendee.')
            .position('top right')
            .hideDelay(3000)
            .theme("error-toast")
        );
      });
    };

}]);
