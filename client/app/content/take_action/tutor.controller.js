'use strict';

angular.module('womenWorkingWithWomenApp')
	.controller('TutorCtrl', ['$scope', function($scope){
		$scope.title = "Tutor!"
		$scope.genders = ('Male Female Other').split(' ');
		$scope.tutor = {};
}]);