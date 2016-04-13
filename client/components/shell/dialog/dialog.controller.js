'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('DialogController', function ($scope, Api, $mdDialog, $http) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };


  $scope.addThing = function() {
    if($scope.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
    $mdDialog.hide();
  };
});
