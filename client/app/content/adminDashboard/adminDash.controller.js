'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AdminDashCtrl', ['$scope', 'Api', '$mdToast', 'Auth', '$mdDialog', '$mdMedia', function($scope, Api, $mdToast, Auth, $mdDialog, $mdMedia) {
    $scope.events = [];
    $scope.showDetails = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

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

    $scope.createEvent = function($event){
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
       $mdDialog.show({
         controller: DialogController,
         templateUrl: '/app/content/adminDashboard/newEventDialog.html',
         parent: angular.element(document.body),
         targetEvent: $event,
         clickOutsideToClose:true,
         fullscreen: useFullScreen
       })
       .then(function(event) {
         // Add the event to the database.
         console.log(event);
       }, function() {
         concole.log("add event canceled.")
       });
       $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
         $scope.customFullscreen = (wantsFullScreen === true);
       });
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

    function DialogController($scope, $mdDialog) {
      $scope.event = {};

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.create = function() {
        $mdDialog.hide($scope.event);
      };
    };
}]);
