'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AdminDashCtrl', ['$scope', 'Api', '$mdToast', 'Auth', '$mdDialog', function($scope, Api, $mdToast, Auth, $mdDialog) {
    $scope.events = [];
    $scope.showDetails = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


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

    $scope.checkBox = function(attendee, $event){
      $event.preventDefault();
      if($scope.isAdmin()){
        if(attendee.checkedIn == false){
          attendee.checkedIn = true;
          Api.updateAttendee(attendee._id, attendee).then(function(response){
            $($event.target).prop('checked', true); // Show the box as checked.
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
        }else{
          // Make the admin confirm the unchecking in.
          var confirm = $mdDialog.confirm()
          .title('Are you sure you want to uncheck this attendee?')
          .textContent('This attendee will no longer be marked as having been here.')
          .ariaLabel('Lucky day')
          .ok('Confirm')
          .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            // Uncheck in the attendee.
            attendee.checkedIn = false;
            Api.updateAttendee(attendee._id, attendee).then(function(response){
              $($event.target).prop('checked', false); // Show the box as checked.
              $mdToast.show(
                $mdToast.simple()
                  .content('Uncheck-in succesfull!')
                  .position('top right')
                  .hideDelay(3000)
                  .theme("success-toast")
              );
            }, function(err){
              $mdToast.show(
                $mdToast.simple()
                  .content('Error: Could not uncheck-in attendee.')
                  .position('top right')
                  .hideDelay(3000)
                  .theme("error-toast")
              );
            });
          }, function() {
          });
        }
      }
    };
}]);
