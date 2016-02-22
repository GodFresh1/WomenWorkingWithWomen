angular.module('womenWorkingWithWomenApp')
  .factory('Api', ['$http', function($http){
    return {
      partnerRequest: function(partner){
        return $http.post('http://localhost:9000/api/partners/submit-request', partner);
      },
      contactRequest: function(request){
        return $http.post('http://localhost:9000/api/contact/submit-request', request);
      }
    }
}]);
