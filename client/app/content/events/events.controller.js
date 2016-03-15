'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('EventsCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api', function($scope, $compile, $timeout, uiCalendarConfig, Api) {
  $scope.title = "How to Get Involved";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var allEvents = [];

    Api.getAllEvents().then(function(response){
      $scope.eventSources = response.Data;
    }, function(error){
      // handle error here
    });

    $scope.eventSources = {
      //  color: '#EFE5F0',
      //  textColor: 'purple',
       events: [{
         id: 0,
         title: "Test Event",
         start: new Date(2016, 3, 17, 2, 30, 0),
         end: new Date(2016, 3, 17, 4, 30, 0), // Note: this is a 2 hour event.
         description: "An event for testing.",
         location: "1234 Made Up St, Doesnt Exist, AL, 12345",
         imgUrl: "http://notarealurl.com"
       }]
    };

    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.genders = ('Male Female Other').split(' ');
}]);
