'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('NavBarCtrl', function($scope, $timeout){
    $timeout(function(){
      $(".dropdown-button").dropdown();
      $('.button-collapse').sideNav({
            closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            edge: 'right'
          }
      );
      $('.collapsible').collapsible();
    });

    $scope.closeNav = function(){
      $('.button-collapse').sideNav('hide');
    }
});
