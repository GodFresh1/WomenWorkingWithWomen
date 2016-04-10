'use strict';

angular.module('womenWorkingWithWomenApp')
	.controller('VolunteerCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api', '$mdDialog','$mdToast', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdDialog, $mdToast, $window){
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
	        //Api.addEventToVolunteer(volunteer, eventID); 
	      }, function(error){
	        handleError(error);
	      });
      	console.log("hi");
	    };

	    var handleSuccess = function(){
      		$window.scrollTo(0, 0);
      		alert = $mdDialog.alert({
	        	title: 'Sucessfully Signed-Up',
	        	htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
	         	$scope.volunteer.lastName + ', ' + $scope.volunteer.firstName + '</h4></li><li class="collection-item"><div>' +
		        $scope.volunteer.email + '</div></li><li class="collection-item"><div> '+
		        $scope.volunteer.phone + '</div></li><li class="collection-item"><div> '+
		        $scope.volunteer.age + '</div></li><li class="collection-item"><div> '+
		        $scope.volunteer.gender + '</div></li></ul>',
		        ok: 'Close'
	      	});
	      	$mdDialog.show( alert ).finally(function() {
	            alert = undefined;
	            $scope.volunteer = {};
	      	});
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

	    $scope.confirmVolunteer = function(){
      		confirm = $mdDialog.confirm({
        	title: 'Confirm Details',
        	htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         	$scope.volunteer.lastName + ', ' + $scope.volunteer.firstName + '</h4></li><li class="collection-item"><div>' +
         	$scope.volunteer.email + '</div></li><li class="collection-item"><div> '+
         	$scope.volunteer.phone + '</div></li><li class="collection-item"><div> '+
         	$scope.volunteer.age + '</div></li><li class="collection-item"><div> '+
         	$scope.volunteer.gender + '</div></li></ul>',
        	ok: 'Yes',
        	cancel: 'No'
      		});

      		$mdDialog.show( confirm ).then(function() {
        		$scope.registerVolunteer();
     	 	}, function(){
        		return false;
     		});
    	}

	    $scope.registerVolunteer= function(){
      	// see if this volunteer has already registered
      		Api.getOneVolunteerByProperties($scope.volunteer).then(function(response){
		        var volunteer = response.data;
		        // Update the volunteer
		        Api.updateVolunteer(volunteer._id, $scope.volunteer).then(function(response){
		          // Add this volunteer to the event volunteer list.
		          addVolunteerToEvent($scope.volunteer.eventAttending, volunteer);
		        }, function(error){
		          handleError(error);
		        });

      		}, function(error){
		        if(error.status==404){
		          // This person is not in the database so create a new volunteer.
		          Api.createVolunteer($scope.volunteer).then(function(response){
		            // Add this volunteer to the event
		            addVolunteerToEvent($scope.volunteer.eventAttending, response.data);
		          }, function(error){
		            handleError(error);
		          });
		        }else{
		          handleError(error);
		        }
      		});
      		
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