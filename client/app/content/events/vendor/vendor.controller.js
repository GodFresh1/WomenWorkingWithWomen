'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('VendorCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api','$mdDialog', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdDialog, $window) {
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
      $window.scrollTo(0, 0);
      alert = $mdDialog.alert({
        title: 'Registration Successful',
        htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         $scope.vendor.lastName + ', ' + $scope.vendor.firstName + '</h4></li><li class="collection-item"><div>' +
         $scope.vendor.email + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.phone + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.faxNumber + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.website + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.organizationName + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.organizationAddress + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.jobTitle + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.eventAttending + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.descriptionOfServices + '</div></li></ul>',
        ok: 'Close'
      });
      $mdDialog.show( alert ).finally(function() {
            alert = undefined;
            $scope.vendor = {};
      });
    }

    var handleError = function(error){
      console.log(error);
      $window.scrollTo(0, 0);
      var errorMessage = error.data!=null ? error.data : "Could not communicate with the server.";
      alert = $mdDialog.alert().title('Unsuccessful Registration, ').content(errorMessage).ok('Close');
      $mdDialog.show( alert ).finally(function() {
            alert = undefined;
            $scope.vendor = {};
      });
    }

    $scope.registerVendor = function(){
      confirm = $mdDialog.confirm({
        title: 'Confirm Details',
        htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         $scope.vendor.lastName + ', ' + $scope.vendor.firstName + '</h4></li><li class="collection-item"><div>' +
         $scope.vendor.email + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.phone + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.faxNumber + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.website + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.organizationName + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.organizationAddress + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.jobTitle + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.eventAttending + '</div></li><li class="collection-item"><div>'+
         $scope.vendor.descriptionOfServices + '</div></li></ul>',
        ok: 'Yes'
        cancel: 'No'
      });
      $mdDialog.show( confirm ).finally(function() {
        confirm = undefined;
        $scope.vendor = {};
      }, function(){
        confirm = undefined;
        break;
      });
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
