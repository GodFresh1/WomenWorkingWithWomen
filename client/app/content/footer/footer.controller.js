'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('FooterCtrl', ['$scope', '$window', 'Auth', function ($scope, $window, Auth) {


    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $window.scrollTo(0, 0);
    };
  }]);
