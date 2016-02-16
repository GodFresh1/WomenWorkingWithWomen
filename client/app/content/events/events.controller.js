'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('EventsCtrl', function($scope){
    $scope.title = "HOW TO GET INVOLVED"
  })
  angular.module("materialExample").controller("calendarCtrl", function($scope, $filter) {
      $scope.selectedDate = null;
      $scope.firstDayOfWeek = 0;
      $scope.setDirection = function(direction) {
        $scope.direction = direction;
      };
      $scope.dayClick = function(date) {
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
      };
      $scope.prevMonth = function(data) {
        $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
      };
      $scope.nextMonth = function(data) {
        $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
      };
      $scope.setDayContent = function(date) {
        // You would inject any HTML you wanted for
        // that particular date here.
          return "<p></p>";
      };
  });
