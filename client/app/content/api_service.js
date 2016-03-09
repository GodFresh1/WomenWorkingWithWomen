// TODO: Write tests for this service!!!!!

angular.module('womenWorkingWithWomenApp')
  .factory('Api', ['$http', function($http){
    var API_BASE_URL = 'http://localhost:9000/api/';
    return {
      // Contact Requests
      partnerRequest: function(partner){
        return $http.post(API_BASE_URL + 'partners/submit-request', partner);
      },
      contactRequest: function(request){
        return $http.post(API_BASE_URL + 'contact/submit-request', request);
      },

      // TODO: The endpoints below have not yet been tested.
      // Event Stuff
      getAllEvents: function(){
        return $http.get(API_BASE_URL + 'events/');
      },
      getOneEvent: function(_id){
        return $http.get(API_BASE_URL + 'events/' + _id);
      },
      createEvent: function(event){
        return $http.post(API_BASE_URL + 'events/', event);
      },
      updateEvent: function(_id, event){
        return $http.put(API_BASE_URL + 'events/' + _id, event);
      },
      deleteEvent: function(_id){
        return $http.delete(API_BASE_URL + 'events/' + _id);
      },

      // Volunteer Stuff
      // Event Stuff
      getAllVolunteers: function(){
        return $http.get(API_BASE_URL + 'volunteers/');
      },
      getOneVolunteer: function(_id){
        return $http.get(API_BASE_URL + 'volunteers/' + _id);
      },
      createVolunteer: function(volunteer){
        return $http.post(API_BASE_URL + 'volunteers/', volunteer);
      },
      updateVolunteer: function(_id, volunteer){
        return $http.put(API_BASE_URL + 'volunteers/' + _id, volunteer);
      },
      deleteVolunteer: function(_id){
        return $http.delete(API_BASE_URL + 'volunteers/' + _id);
      }
    }
}]);
