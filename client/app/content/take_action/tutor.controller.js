'use strict';

angular.module('womenWorkingWithWomenApp')
	.controller('TutorCtrl', ['$scope', '$compile', '$timeout', 'Api', '$mdToast', '$window', function($scope, $compile, $timeout, Api, $mdToast, $window){
		$scope.tutor = {};
		$scope.genders = ('Male Female Other').split(' ');


	    var handleSuccess = function(){
	      $scope.tutor = {};
	      $window.scrollTo(0, 0);
	      $mdToast.show(
	        $mdToast.simple()
	          .content('Registered to Tutor!')
	          .position('top right')
	          .hideDelay(3000)
	          .theme("success-toast")
	      );
	    };

	    var handleError = function(error){
	      console.log(error);
	      $scope.tutor = {};
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


	    $scope.registerTutor= function(){
      	// see if this tutor has already registered
      		Api.getOneTutorByProperties($scope.tutor).then(function(response){
		        var tutor = response.data;
		        // Update the tutor
		        Api.updateTutor(tutor._id, $scope.tutor).then(function(response){
		        	handleSuccess();
		        }, function(error){
		          handleError(error);
		        });

      		}, function(error){
		        if(error.status==404){
		          // This person is not in the database so create a new tutor.
		          tutor.timesTutored = 0; 
		          Api.createTutor($scope.tutor).then(function(response){
		            handleSuccess();
		          }, function(error){
		            handleError(error);
		          });
		        }else{
		          handleError(error);
		        }
      		});
      		
   		};
    $scope.stopClick = function($event){
      $event.target.blur();
    };
	  
}]);