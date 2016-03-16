'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AttendeeCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api','$mdToast', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdToast, $window) {
    $scope.attendee = {};
    $scope.events = [];
    $scope.genders = ('Male Female Other').split(' ');

    // Get all the events from the server.
    Api.getAllEvents().then(function(response){
       $scope.events=response.data;
    }, function(error){
      console.log("Found an error");
      // handle error here
    });

    var addAttendeeToEvent = function(eventID, attendee){
      Api.addAttendeeToEvent(eventID, attendee).then(function(response){
        handleSuccess();
      }, function(error){
        handleError(error);
      });
    };

    var handleSuccess = function(){
      $scope.attendee = {};
      $window.scrollTo(0, 0);
      $mdToast.show(
        $mdToast.simple()
          .content('Registration Successful!')
          .position('top right')
          .hideDelay(3000)
          .theme("success-toast")
      );
    }

    var handleError = function(error){
      console.log(error);
      $scope.attendee = {};
      $window.scrollTo(0, 0);
      var errorMessage = error.data!=null ? (error.data.message || error.data) : "Could not communicate with the server.";
      $mdToast.show(
        $mdToast.simple()
          .content('Error: ' + errorMessage)
          .position('top right')
          .hideDelay(3000)
          .theme("error-toast")
      );
    }

    $scope.registerAttendee = function(){
      // See if this attendee already exists in the db.
      Api.getOneAttendeeByProperties($scope.attendee).then(function(response){
        var attendee = response.data;
        // Update the attendee
        Api.updateAttendee(attendee._id, $scope.attendee).then(function(response){
          // Add this attenddee to the event attendee list.
          addAttendeeToEvent($scope.attendee.eventAttending, attendee);
        }, function(error){
          handleError(error);
        });

      }, function(error){
        if(error.status==404){
          // This person is not in the database so create a new attendee.
          Api.createAttendee($scope.attendee).then(function(response){
            // Add this attendee to the events attendee list.
            addAttendeeToEvent($scope.attendee.eventAttending, response.data);
          }, function(error){
            handleError(error);
          });
        }else{
          handleError(error);
        }
      });
    };

    // Hacky fix to make the dropdown a required field.
    $('#eventIdInput').keydown(function(e) {
      var keyCode = e.keyCode || e.which;

      if (keyCode != 9) { // This is to allow Tab to go to the next form element.
        e.preventDefault();
        return false;
      }
       return true;
    });

    $scope.stopClick = function($event){
      $event.target.blur();
    }
}]);
