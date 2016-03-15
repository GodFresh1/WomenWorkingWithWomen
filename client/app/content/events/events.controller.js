'use strict';


angular.module('womenWorkingWithWomenApp')
  .controller('EventsCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'Api', function($scope, $compile, $timeout, uiCalendarConfig, Api) {
    $scope.attendee = {};
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var allEvents = [];

    Api.getAllEvents().then(function(response){
       $scope.events=response.data;
    }, function(error){
      console.log("Found an error");
      // handle error here
    });

    var addAttendeeToEvent = function(attendee, event){
      
    }

    $scope.registerAttendee = function(){

      // See if this attendee already exists in the db.
      Api.getOneAttendeeByName($scope.attendee).then(function(response){
        var attendee = response.data;
        // Update the attendee in case they chanched emails/ phone etc.
        Api.updateAttendee(attendee._id, $scope.attendee).then(function(response){
          // TODO: Add this attenddee to the event attendee list.

        }, function(error){
          console.log(error);
          // TODO: Handle Error;
        })

      }, function(error){

        if(error.status==404){
          // This person is not in the database so create a new attendee.
          Api.createAttendee($scope.attendee).then(function(response){
            // TODO: Add this attendee to the events attendee list.

          }, function(error){
            // TODO: Handle Error.
          })
        }
      })

      // Api.createAttendee($scope.attendee).then(function(response){
      //   console.log("res");
      //   console.log(response);
      // }, function(error){
      //   console.log("err");
      //   console.log(error);
      // });



      // Api.getOneEvent($scope.attendee.eventsAttended).then(function(response){
      //
      //   var event = response.data;
      //   // See if this attendee already exists.
      //   Api.getOneAttendee($scope.attendee._id).then(function(response){
      //
      //     $scope.attendee.eventsAttended = [event._id];
      //     Api.updateAttendee($scope.attendee._id, $scope.attendee).then(function(response){
      //
      //     }, function(error){
      //       console.log(error);
      //     })
      //   }, function(error){
      //     if(error.status == 404){
      //
      //       // The attendee is new so create a new attendee.
      //     }
      //   })
      // }, function(error){
      //   console.log(error);
      // })
      // console.log($scope.attendee);
      // $scope.attendee.eventsAttended = [$scope.attendee.eventsAttended];
      // // Try to find an attendee with this id already.
      // Api.getOneAttendee($scope.attendee._id).then(function(response){
      //   // If this person is already in the database, update their info!
      //   Api.updateAttendee(response.data._id, $scope.attendee).then(function(response){
      //     console.log("Reponse");
      //     console.log(response);
      //   }, function(error){
      //     console.log(error);
      //   });
      // }, function(error){
      //   if(error.status == 404){
      //     console.log("This attendee does not exist.");
      //   }
      // });
    };

    $scope.eventSources = {
        color: '#EFE5F0',
        textColor: 'purple',
        events: $scope.events
       //console.log(events);
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };


    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.genders = ('Male Female Other').split(' ');

    // Hacky fix to make the dropdown required.
    $('#eventIdInput').keydown(function(e) {
       e.preventDefault();
       return false;
    });
}]);
