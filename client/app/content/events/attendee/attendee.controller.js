'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AttendeeCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api','$mdDialog', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdDialog, $window) {
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
      $window.scrollTo(0, 0);
      alert = $mdDialog.alert({
        title: 'Registration Successful',
        htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         $scope.attendee.lastName + ', ' + $scope.attendee.firstName + '</h4></li><li class="collection-item"><div>' +
         $scope.attendee.email + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.phone + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.age + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.gender + '</div></li></ul>',
        ok: 'Close'
      });
      $mdDialog.show( alert ).finally(function() {
            alert = undefined;
            $scope.attendee = {};
      });
    }

    var handleError = function(error){
      console.log(error);
      $window.scrollTo(0, 0);
      var errorMessage = error.data!=null ? (error.data.message || error.data) : "Could not communicate with the server.";
      alert = $mdDialog.alert().title('Unsuccessful Registration, ').content(errorMessage).ok('Close');
      $mdDialog.show( alert ).finally(function() {
            alert = undefined;
            $scope.attendee = {};
      });
    }

    $scope.registerAttendee = function(){
      confirm = $mdDialog.confirm({
        title: 'Confirm Details',
        htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         $scope.attendee.lastName + ', ' + $scope.attendee.firstName + '</h4></li><li class="collection-item"><div>' +
         $scope.attendee.email + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.phone + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.age + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.gender + '</div></li></ul>',
        ok: 'Yes'
        cancel: 'No'
      });
      $mdDialog.show( confirm ).finally(function() {
        confirm = undefined;
        $scope.attendee = {};
      }, function(){
        confirm = undefined;
        break;
      });
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
