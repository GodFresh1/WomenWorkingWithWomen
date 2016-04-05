'use strict';



angular.module('womenWorkingWithWomenApp')
  .controller('AdminDashCtrl', ['$scope', 'Api', '$mdToast', 'Auth', function($scope, Api, $mdToast, Auth) {
    $scope.events = [];
    $scope.csvEventtTemp = [];
    $scope.showDetails = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


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


    $scope.showDetails = function(event){
      var isShown = $scope.showDetails[event._id];
      $scope.showDetails[event._id] = (isShown == undefined || !isShown) ? true : false;
    }

    $scope.produceCSV = function(event){
      Api.getOneEvent(event._id).then(function(response){
        $scope.csvEventtTemp = response.data;
        /*Produce and commence download for CSV*/
        var json2csv = require('json2csv');
        var fields = ['title', 'description', 'location', 'startDate', 'startTime', 'endDate', 'endTime', 'attendees', 'vendors', 'volunteers'];

        json2csv({ data: Object, fields: fields }, function(err, csv) {
          if (err) console.log(err);
          console.log(csv);
        });
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

    $scope.checkBox = function(attendee){
      if($scope.isAdmin()){
        attendee.checkedIn = true;
        Api.updateAttendee(attendee._id, attendee).then(function(response){
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
      }
    };
}]);
