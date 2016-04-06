'use strict';

angular.module('womenWorkingWithWomenApp')
	.controller('VolunteerCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api', '$mdToast', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdToast, $window){
		$scope.volunteer = {};
		$scope.events = [];
		$scope.genders = ('Male Female Other').split(' ');

		Api.getAllEvents().then(function(response){
        $scope.events=response.data;
    	}, function(error){
     	 console.log("Found an error");
          // handle error here
    	});


    	var addVolunteerToEvent = function(eventID, volunteer){
      	Api.addVolunteerToEvent(eventID, volunteer).then(function(response){
	        handleSuccess();
	      }, function(error){
	        handleError(error);
	      });
      	console.log("hi");
	    };

	    var handleSuccess = function(){
	      $scope.volunteer = {};
	      $window.scrollTo(0, 0);
	      $mdToast.show(
	        $mdToast.simple()
	          .content('Registration Successful!')
	          .position('top right')
	          .hideDelay(3000)
	          .theme("success-toast")
	      );
	    };

	    var handleError = function(error){
	      console.log(error);
	      $scope.volunteer = {};
	      $window.scrollTo(0, 0);
	      var errorMessage = error.data!=null ? (error.data.message || error.data) : "Could not communicate with the server.";
	      $mdToast.show(
	        $mdToast.simple()
	          .content('Error: ' + errorMessage)
	          .position('top right')
	          .hideDelay(3000)
	          .theme("error-toast")
	      );
	    };

	    $scope.registerVolunteer= function(){
      	// see if this volunteer has already registered
      		/*Api.getOneVolunteerByProperties($scope.volunteer).then(function(response){
		        var volunteer = response.data;
		        // Update the volunteer
		        Api.updateVolunteer(volunteer._id, $scope.volunteer).then(function(response){
		          // Add this volunteer to the event volunteer list.
		          addVolunteerToEvent($scope.volunteer.eventAttending, volunteer);
		        }, function(error){
		          handleError(error);
		        });

      		}, function(error){
		        if(error.status==404){*/
		          // This person is not in the database so create a new volunteer.
		          Api.createVolunteer($scope.volunteer).then(function(response){
		            // Add this volunteer to the event
		            addVolunteerToEvent($scope.volunteer.eventAttending, response.data);
		          }, function(error){
		            handleError(error);
		          });
		        /*}else{
		          handleError(error);
		        }
      		});*/
      		
   		};

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
    };
	  
}]);