'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('AdminDashCtrl', ['$scope', 'Api', '$mdToast', 'Auth', '$mdDialog', '$mdMedia', function($scope, Api, $mdToast, Auth, $mdDialog, $mdMedia) {
    $scope.events = [];
    $scope.showDetails = {};
    $scope.csvTemp = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.volunteers = [];
    $scope.donations = [];
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    var testid;

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

    Api.getAllVolunteers().then(function(response){
      $scope.volunteers = response.data;
    }, function(err){
      $mdToast.show(
        $mdToast.simple()
          .content('Error: Could not connect to the server. ')
          .position('top right')
          .hideDelay(3000)
          .theme("error-toast")
      );
    });

    Api.getAllDonations().then(function(response){
      $scope.donations = response.data;
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

    $scope.produceAttendeeCSV = function(event){
      Api.getAllEvents().then(function(response){
        $scope.csvTemp = response.data;
        var CSV = '';
        CSV += 'Attendees' + '\r\n\n';
        for (var i = 0; i < response.data.length; i++){
          CSV += 'Event: '+ response.data[i].title.toString() + '\r\n';
          if(response.data[i].attendees.length == 0){
            CSV += 'No attendees'+ '\r\n';
          }
          else{
            CSV += 'First Name' + ',' + 'Last Name' + ',' + 'Age' + ',' + 'Email' + ',' + 'Phone' + ',' + 'Check-in?' + '\r\n';
            for (var j = 0; j < response.data[i].attendees.length; j++){
            CSV += '"' + response.data[i].attendees[j].firstName.toString() + '"' + ',';
            CSV += '"' + response.data[i].attendees[j].lastName.toString() + '"' + ',';
            CSV += '"' + response.data[i].attendees[j].age.toString() + '"' + ',';
            CSV += '"' + response.data[i].attendees[j].email.toString() + '"' + ',';
            CSV += '"' + response.data[i].attendees[j].phone.toString() + '"' + ',';
            CSV += '"' + response.data[i].attendees[j].checkedIn.toString() + '"' + '\r\n';
            }
          }
        }
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download =  "Attendees.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, function(err){
        $mdToast.show(
          $mdToast.simple()
            .content('Error: Could not connect to the server. ')
            .position('top right')
            .hideDelay(3000)
            .theme("error-toast")
          );
      });
    }

    $scope.produceVendorCSV = function(event){
      Api.getAllEvents().then(function(response){
        $scope.csvEventTemp = response.data;
        var CSV = '';
        CSV += 'Vendors' + '\r\n\n';
        for (var i = 0; i < response.data.length; i++){
          CSV += 'Event: '+ response.data[i].title.toString() + '\r\n';
          if(response.data[i].vendors.length == 0){
            CSV += 'No vendors'+ '\r\n';
          }
          else{
            CSV += 'First Name' + ',' + 'Last Name' + ',' + 'jobTitle' + ',' + 'Email' + ',' + 'Phone' + ',' + 'organizationName' + 'organizationAddress' + 'descriptionOfServices' + 'descriptionOfPrizes' + '\r\n';
            for (var j = 0; j < response.data[i].vendors.length; j++){
            CSV += '"' + response.data[i].vendors[j].firstName.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].lastName.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].jobTitle.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].email.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].phone.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].organizationName.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].organizationAddress.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].descriptionOfServices.toString() + '"' + ',';
            CSV += '"' + response.data[i].vendors[j].descriptionOfPrizes.toString() + '"' + '\r\n';
            }
          }
        }
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download =  "Vendors.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, function(err){
        $mdToast.show(
          $mdToast.simple()
            .content('Error: Could not connect to the server. ')
            .position('top right')
            .hideDelay(3000)
            .theme("error-toast")
          );
      });
    }

    $scope.produceVolunteerCSV = function(event){
      Api.getAllEvents().then(function(response){
        $scope.csvTemp = response.data;
        var CSV = '';
        CSV += 'Volunteers' + '\r\n\n';
        for (var i = 0; i < response.data.length; i++){
          CSV += 'Event: '+ response.data[i].title.toString() + '\r\n';
          if(response.data[i].volunteers.length == 0){
            CSV += 'No volunteers'+ '\r\n';
          }
          else{
            CSV += 'First Name' + ',' + 'Last Name' + ',' + 'Age' + ',' + 'Email' + ',' + 'Phone' + '\r\n';
            for (var j = 0; j < response.data[i].volunteers.length; j++){
            CSV += '"' + response.data[i].volunteers[j].firstName.toString() + '"' + ',';
            CSV += '"' + response.data[i].volunteers[j].lastName.toString() + '"' + ',';
            CSV += '"' + response.data[i].volunteers[j].age.toString() + '"' + ',';
            CSV += '"' + response.data[i].volunteers[j].email.toString() + '"' + ',';
            CSV += '"' + response.data[i].volunteers[j].phone.toString() + '"' +  '\r\n';
            }
          }
        }
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download =  "Volunteers.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, function(err){
        $mdToast.show(
          $mdToast.simple()
            .content('Error: Could not connect to the server. ')
            .position('top right')
            .hideDelay(3000)
            .theme("error-toast")
          );
      });
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

         Api.createEvent(event).then(function(response){
            $mdToast.show(
            $mdToast.simple()
              .content('Add event succesfull!')
              .position('top right')
              .hideDelay(3000)
              .theme("success-toast")
         );
         });

         //Updates the array of events which will be populated on the admin dashboard
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

         // Add the event to the database.
         console.log(event);
       }, function() {
         console.log("Add event canceled.")
       });
       $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
         $scope.customFullscreen = (wantsFullScreen === true);
       });

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

         Api.createEvent(event).then(function(response){
            $mdToast.show(
            $mdToast.simple()
              .content('Add event succesfull!')
              .position('top right')
              .hideDelay(3000)
              .theme("success-toast")
         );
         });

         //Updates the array of events which will be populated on the admin dashboard
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

         console.log(event);
       }, function() {
         console.log("Add event canceled.")
       });
       $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
         $scope.customFullscreen = (wantsFullScreen === true);
       });
    }

     $scope.editDetails = function($event){
       console.log($event._id);

       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/app/content/adminDashboard/editEventDialog.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(event) {

          Api.updateEvent($event._id, event).then(function(response){
             $mdToast.show(
             $mdToast.simple()
               .content('Edit event succesfull!')
               .position('top right')
               .hideDelay(3000)
               .theme("success-toast")
          );


             //Updates the array of events which will be populated on the admin dashboard
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
          });

          

          // Add the event to the database.
          console.log(event);
        }, function() {
          console.log("Edit event canceled.")

        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
     }

    $scope.deleteEvent = function($event){
      console.log($event._id);
      testid = $event._id;

       // Make the admin confirm the deletion.
        var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this event?')
        .textContent('This event will no longer show up.')
        .ariaLabel('Lucky day')
        .ok('Confirm')
        .cancel('Cancel');
        $mdDialog.show(confirm).then(function(event) {
          // Delete the event.
          console.log($event._id);
          Api.deleteEvent($event._id).then(function(response){
            $mdToast.show(
              $mdToast.simple()
              .content('Deletion succesfull!')
              .position('top right')
              .hideDelay(3000)
              .theme("success-toast")
            );

            //Updates the array of events which will be populated on the admin dashboard
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
            }, function(err){
            $mdToast.show(
                $mdToast.simple()
                .content('Error: Could not delete the event.')
                .position('top right')
                .hideDelay(3000)
                .theme("error-toast")
            );
          });

        }, function() {
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
      $scope.edit = function() {
        $mdDialog.hide($scope.event);
      };
    };
}]);
