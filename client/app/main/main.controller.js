'use strict';

angular.module('womenWorkingWithWomenApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.settings = {};

    // A timeout with a delay of 0 will add this function to the browser event queue.
    // This is necessary to let other stuff finish before checking if the user is an admin.
    setTimeout(function(){
      // TODO: When you log in, you have to refresh the page to be able to edit.
      // TODO: To enable two way data binding, create a custom contenteditable directive.
      $scope.settings.canEdit = Auth.isAdmin();
    }, 0)


    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.onFocus = function(thing){
      console.log(thing.name + " had been focused!");
    };

    $scope.onBlur = function(thing){
      console.log(thing.name + " had been blurred!");
    };

    $scope.getColor = function($index) {
      var _d = ($index + 1) % 11;
      var bg = '';

      switch(_d) {
        case 1:       bg = 'red';         break;
        case 2:       bg = 'green';       break;
        case 3:       bg = 'darkBlue';    break;
        case 4:       bg = 'blue';        break;
        case 5:       bg = 'yellow';      break;
        case 6:       bg = 'pink';        break;
        case 7:       bg = 'darkBlue';    break;
        case 8:       bg = 'purple';      break;
        case 9:       bg = 'deepBlue';    break;
        case 10:      bg = 'lightPurple'; break;
        default:      bg = 'yellow';      break;
      }

      return bg;
    };

    $scope.getSpan = function($index) {
      var _d = ($index + 1) % 11;

      if (_d === 1 || _d === 5) {
        return 2;
      }
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
