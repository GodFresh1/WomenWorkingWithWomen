'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('NavBarCtrl', ['$scope', '$timeout', '$location','Auth', function($scope, $timeout, $location, Auth){
    $timeout(function(){
      $(".dropdown-button").dropdown();
      $('.button-collapse').sideNav({
            closeOnClick: false,
            edge: 'right'
          }
      );
      $('.collapsible').collapsible();
    });

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    // See what route is active
    $scope.routeIs = function(item){
      if($location.path() == item){
        return true;
      }
      return false;
    }

    $scope.routeContains = function(item){
      if($location.path().indexOf(item) != -1){
        return true;
      }
      return false;
    }


    $scope.closeNav = function(){
      $('.button-collapse').sideNav('hide');
    }
}]);
