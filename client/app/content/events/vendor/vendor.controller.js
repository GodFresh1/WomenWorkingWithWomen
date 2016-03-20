'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('VendorCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api','$mdToast', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdToast, $window) {
    $scope.vendor = {};
    $scope.events = [];

    // Get all the events from the server.
    Api.getAllEvents().then(function(response){
       $scope.events=response.data;
    }, function(error){
      console.log("Found an error");
      // handle error here
    });

    var addVendorToEvent = function(eventID, vendor){
      Api.addVendorToEvent(eventID, vendor).then(function(response){
        handleSuccess();
      }, function(error){
        handleError(error);
      });
    };

    var handleSuccess = function(){
      $scope.vendor = {};
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
      $scope.vendor = {};
      $window.scrollTo(0, 0);
      var errorMessage = error.data!=null ? error.data : "Could not communicate with the server.";
      $mdToast.show(
        $mdToast.simple()
          .content('Error: ' + errorMessage)
          .position('top right')
          .hideDelay(3000)
          .theme("error-toast")
      );
    }

    $scope.registerVendor = function(){
      // See if this vendor already exists in the db.
      Api.getOneVendorByProperties($scope.vendor).then(function(response){
        console.log($scope.vendor);
        var vendor = response.data;
        // Update the vendor
        Api.updateVendor(vendor._id, $scope.vendor).then(function(response){
          // Add this vendor to the event vendor list.
          addVendorToEvent($scope.vendor.eventAttending, vendor);
        }, function(error){
          handleError(error);
        });

      }, function(error){
        if(error.status==404){
          // This company is not in the database so create a new vendor.
          Api.createVendor($scope.vendor).then(function(response){
            // Add this vendor to the events vendor list.
            addVendorToEvent($scope.vendor.eventAttending, response.data);
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
