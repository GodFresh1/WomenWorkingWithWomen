'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AttendeeCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api','$mdDialog', '$window', function($scope, $compile, $timeout, uiCalendarConfig, Api, $mdDialog, $window) {
    $scope.attendee = {};
    $scope.events = [];
    $scope.genders = ('Male Female Other').split(' ');
    $scope.fashions = ('Yes No').split(' ');

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
        htmlContent: '<div class="row"><h5 align="center">Redirecting to Paypal</h5></div>',
        ok: 'Close'
      });
      $mdDialog.show( alert ).finally(function() {
             Api.getOneEvent($scope.attendee.eventAttending).then(function(response){
               console.log(response.attendee_price);
               alert = undefined;
               var f = document.createElement("form");
               f.setAttribute('method',"post");
               f.setAttribute('action',"https://www.paypal.com/cgi-bin/webscr");
               f.setAttribute('target','');
               var cmd = document.createElement("input"); //input element, text
               cmd.setAttribute('type',"hidden");
               cmd.setAttribute('name','cmd');
               cmd.setAttribute('value','_xclick');
               var business = document.createElement("input"); //input element, Submit button
               business.setAttribute('type',"hidden");
               business.setAttribute('name','business');
               business.setAttribute('value','4wsbms@gmail.com');
               var item_name = document.createElement("input"); //input element, Submit button
               item_name.setAttribute('type',"hidden");
               item_name.setAttribute('name','item_name');
               item_name.setAttribute('value','Donation');
               var item_number = document.createElement("input"); //input element, Submit button
               item_number.setAttribute('type',"hidden");
               item_number.setAttribute('name','item_number');
               item_number.setAttribute('value','1');
               var amount = document.createElement("input"); //input element, Submit button
               amount.setAttribute('type',"text");
               amount.setAttribute('name','amount');
               amount.setAttribute('value', response.attendee_price.toString());
               var no_shipping = document.createElement("input"); //input element, Submit button
               no_shipping.setAttribute('type',"hidden");
               no_shipping.setAttribute('name','no_shipping');
               no_shipping.setAttribute('value','0');
               var no_note = document.createElement("input"); //input element, Submit button
               no_note.setAttribute('type',"hidden");
               no_note.setAttribute('name','no_note');
               no_note.setAttribute('value','1');
               var currency_code = document.createElement("input"); //input element, Submit button
               currency_code.setAttribute('type',"hidden");
               currency_code.setAttribute('name','currency_code');
               currency_code.setAttribute('value','USD');
               var lc = document.createElement("input"); //input element, Submit button
               lc.setAttribute('type',"hidden");
               lc.setAttribute('name','lc');
               lc.setAttribute('value','US');
               var bn = document.createElement("input"); //input element, Submit button
               bn.setAttribute('type',"hidden");
               bn.setAttribute('name','bn');
               bn.setAttribute('value','PP-BuyNowBF');
               f.appendChild(cmd);
               f.appendChild(business);
               f.appendChild(item_name);
               f.appendChild(item_number);
               f.appendChild(amount);
               f.appendChild(no_shipping);
               f.appendChild(no_note);
               f.appendChild(currency_code);
               f.appendChild(lc);
               f.appendChild(bn);
               f.submit();
               document.getElementsByTagName('body')[0].appendChild(f);
             }, function(error){
               console.log("found an error");
             });
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

    $scope.confirmAttendee = function(){
      confirm = $mdDialog.confirm({
        title: 'Confirm Details',
        htmlContent: '<ul class="collection with-header"><li class="collection-header"><h4>' +
         $scope.attendee.lastName + ', ' + $scope.attendee.firstName + '</h4></li><li class="collection-item"><div>' +
         $scope.attendee.email + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.phone + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.age + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.gender + '</div></li><li class="collection-item"><div> '+
         $scope.attendee.fashion + '</div></li></ul>',
        ok: 'Yes',
        cancel: 'No'
      });

      $mdDialog.show( confirm ).then(function() {
        $scope.registerAttendee();
      }, function(){
        return false;
      });
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
