'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('AboutCtrl', ['$scope', "BoardMembers", function($scope, BoardMembers){
    $scope.boardMembers = BoardMembers.members;
    $scope.title = "ABOUT PAGE DAWG!"
  }]);
