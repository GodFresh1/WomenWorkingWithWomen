'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('NavBarCtrl', function($scope, $timeout){
    $timeout(function(){
      $(".dropdown-button").dropdown();
    });
});
