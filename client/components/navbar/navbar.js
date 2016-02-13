'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('NavBarCtrl', function($scope, $timeout){
    $timeout(function(){
      $(".dropdown-button").dropdown();
      $('.button-collapse').sideNav({
            closeOnClick: false, 
            edge: 'right'
          }
      );
      $('.collapsible').collapsible();
    });

    $scope.closeNav = function(){
      $('.button-collapse').sideNav('hide');
    }
});
