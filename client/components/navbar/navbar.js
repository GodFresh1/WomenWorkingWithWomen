'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('NavBarCtrl', ['$scope', '$timeout', '$location', function($scope, $timeout, $location){
    $timeout(function(){
      $(".dropdown-button").dropdown();
      $('.button-collapse').sideNav({
            closeOnClick: false,
            edge: 'right'
          }
      );
      $('.collapsible').collapsible();
    });

    // See what route is active
    $scope.routeIs = function(item){
      if($location.path() == item){
        return true;
      }
      return false;
    }

    $scope.routeContains = function(item){
      console.log(item);
      if($location.path().indexOf(item) != -1){
        return true;
      }
      return false;
    }


    $scope.closeNav = function(){
      $('.button-collapse').sideNav('hide');
    }
}]);
