'use strict';

angular.module('womenWorkingWithWomenApp')
	.controller('TutorCtrl', ['$scope', '$compile', '$timeout', 'Api', '$mdDialog', '$window', function($scope, $compile, $timeout, Api, $mdDialog, $window){
		$scope.tutor = {};
		$scope.genders = ('Male Female Other').split(' ');
		$scope.subjects = ('Math, Intensive Math, Reading, Intensive Reading, Language Arts, Science, Spanish, Homework Help, Sports, Dance, Arts/Crafts, Recreation, Cleaning the Center, Snacks, Cub/Scout Leader').split(',');

		
	    var handleSuccess = function(){
      		$window.scrollTo(0, 0);
      		alert = $mdDialog.alert({
	        	title: 'Sucessfully Signed-Up',
	        	htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
	         	$scope.tutor.lastName + ', ' + $scope.tutor.firstName + '</h4></li><li class="collection-item"><div>' +
		        $scope.tutor.email + '</div></li><li class="collection-item"><div> '+
		        $scope.tutor.phone + '</div></li><li class="collection-item"><div> '+
		        $scope.tutor.age + '</div></li><li class="collection-item"><div> '+
		        $scope.tutor.gender + '</div></li></ul>',
		        ok: 'Close'
	      	});
	      	$mdDialog.show( alert ).finally(function() {
	            alert = undefined;
	            $scope.tutor = {};
	      	});
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

	    $scope.confirmTutor = function(){
      		confirm = $mdDialog.confirm({
        	title: 'Confirm Details',
        	htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         	$scope.tutor.lastName + ', ' + $scope.tutor.firstName + '</h4></li><li class="collection-item"><div>' +
         	$scope.tutor.email + '</div></li><li class="collection-item"><div> '+
         	$scope.tutor.phone + '</div></li><li class="collection-item"><div> '+
         	$scope.tutor.age + '</div></li><li class="collection-item"><div> '+
         	$scope.tutor.gender + '</div></li></ul>',
        	ok: 'Yes',
        	cancel: 'No'
      		});

      		$mdDialog.show( confirm ).then(function() {
        		$scope.registerTutor();
     	 	}, function(){
        		return false;
     		});
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