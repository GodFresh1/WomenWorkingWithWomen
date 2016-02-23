'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('EventsCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', function($scope, $compile, $timeout, uiCalendarConfig) {
  $scope.title = "How to Get Involved";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.eventSources = {
       color: '#EFE5F0',
       textColor: 'purple',
       events: [
          {title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {title: 'All day Lunch',start: new Date(y, m, 25, 12, 0),end: new Date(y, m, 25, 14, 0),allDay: true},
          {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
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
}]);
