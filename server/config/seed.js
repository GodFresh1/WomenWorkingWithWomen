/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Event = require('../api/event/event.model');
var Volunteer = require('../api/volunteer/volunteer.model');
var Attendee = require('../api/attendee/attendee.model');
var Vendor = require('../api/vendor/vendor.model');
var Tutor = require('../api/tutor/tutor.model');

//
// Attendee.collection.dropAllIndexes(function (err, results) {
//   if(err){console.log(err);}
//   else{console.log("Drop Successful");}
// });
// Vendor.collection.dropAllIndexes(function (err, results) {
//   if(err){console.log(err);}
//   else{console.log("Drop Successful");}
// });
// Event.collection.dropAllIndexes(function (err, results) {
//   if(err){console.log(err);}
//   else{console.log("Drop Successful");}
// });
//
//
//
// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Belinda',
    email: '4wsbms@gmail.com',
    password: 'womenworking1'
  },function() {
      console.log('finished populating users');
    }
  );
});

// // Seed Events
// Event.find({}).remove(function(){
//   Event.create({
//     title: 'Event 3',
//     start: new Date(2016, 11, 17, 2, 30, 0),
//     end: new Date(2016, 11, 17, 4, 30, 0), // Note: this is a 2 hour event.
//     description: "This event is an event where events will be taking place. This is just an example description to see"
//                 + " how this will look on the website. Hopefully it looks nice!",
//     location: "1234 Made Up St, Doesnt Exist, AL, 12345",
//     imgUrl: "http://notarealurl.com"
//   },{
//     title: 'Sample Event 1',
//     start: new Date(2016, 3, 8, 1, 0, 0),
//     end: new Date(2016, 3, 8, 4, 0, 0),
//     description: "This is another event. The description for this one is a little different. There will also be eventst aking place."
//                 + " Hopefully it looks nice.",
//     location: "A BS Address",
//     imgUrl: "http://fakeimage.com"
//   },{
//     title: 'Another event ',
//     start: new Date(2016, 4, 3, 13, 0, 0),
//     end: new Date(2016, 4, 3, 14, 30, 0),
//     description: "This is an example event as well. The description for this one is a little different too. There will also be events taking place."
//                 + " Hopefully it looks nice.",
//     location: "A BS Address",
//     imgUrl: "http://fakeimage.com"
//   },{
//     title: 'An event again',
//     start: new Date(2016, 3, 20, 10, 45, 0),
//     end: new Date(2016, 3, 20, 11, 0, 0),
//     description: "This is another event. There will also be events taking place."
//                 + " Hopefully it looks nice.",
//     location: "A BS Address",
//     imgUrl: "http://fakeimage.com"
//   },{
//     title: 'An example',
//     start: new Date(2016, 3, 3, 1, 0, 0),
//     end: new Date(2016, 3, 3, 4, 0, 0),
//     description: "This is another event. The description for this one is a little different. There will also be events taking place."
//                 + " Hopefully it looks nice.",
//     location: "A BS Address",
//     imgUrl: "http://fakeimage.com"
//   },{
//     title: 'Another Sample Event',
//     start: new Date(2016, 4, 5, 3, 0, 0),
//     end: new Date(2016, 5, 5, 6, 0, 0),
//     description: "This is another descirption of another event that doesn't actually exist.",
//     location: "Another BS Address",
//     imgUrl: "http://fakeimageyea.com"
//   }, function(){
//     console.log('finished populating events.');
//   });
// });
//
// // Seed attendees
// Attendee.find({}).remove(function(){
//   Attendee.create({
//     email: 'attendee@email.com',
//     firstName: 'Eric',
//     lastName: 'Foreman',
//     phone: 1234456123,
//     age: 20
//   }, {
//     email: 'attendee2@email.com',
//     firstName: 'Bob',
//     lastName: "Johnson",
//     phone: 1234456123,
//     age: 21
//   }, {
//     email: 'attendee3@email.com',
//     firstName: 'Bradley',
//     lastName: 'Treuherz',
//     phone: 1234456123,
//     age: 19
//   }, {
//     email: 'attendee4@email.com',
//     firstName: 'Rick',
//     lastName: "Morty",
//     phone: 1234456123,
//     age: 21
//   }, {
//     email: 'attendee5@email.com',
//     firstName: 'Rick',
//     lastName: 'James',
//     phone: 1234456123,
//     age: 20
//   }, {
//     email: 'attendee2@email.com',
//     firstName: 'Jimi',
//     lastName: "Hendrix",
//     phone: 1234456123,
//     age: 21
//   }, {
//     email: 'attendee3@email.com',
//     firstName: 'Justin',
//     lastName: 'Beiber',
//     phone: 1234456123,
//     age: 19
//   }, {
//     email: 'attendee4@email.com',
//     firstName: 'George',
//     lastName: "Harrison",
//     phone: 1234456123,
//     age: 21
//   }, function(){
//     console.log('finshed populating attendees.');
//
//     // Add all the attendees to event 1
//     Attendee.find().exec(function(err, attendees) {
//       attendees.forEach(function(attendee){
//         Event.update({'title': 'Sample Event 1'}, {$addToSet: {attendees: attendee._id}}, function(err, result){
//
//         });
//       });
//     });
//   });
// });
//
//
//
// // Seed volunteers
// Volunteer.find({}).remove(function(){
//   Volunteer.create({
//     _id: 'volunteer1@email.com',
//     firstName: 'first',
//     lastName: 'firstLast',
//     phone: 1234456123
//   }, {
//     _id: 'volunteer2@email.com',
//     firstName: 'first2',
//     lastName: 'first2Last',
//     phone: 1234456123
//   }, {
//     _id: 'volunteer3@email.com',
//     firstName: 'first3',
//     lastName: 'first3Last',
//     phone: 1234456123
//   }, function(){
//     console.log('finshed populating volunteers.');
//   });
// });
//
// // Seen vendors
// Vendor.find({}).remove(function(){
//   Vendor.create({
//     jobTitle: "Salesman",
//     firstName: "Richard",
//     lastName: "Hurts",
//     email: "Email@email.email",
//     phone: 12345678,
//     organizationName: "NAME NAME",
//     organizationAddress: "1234 this is an address",
//     descriptionOfServices: "Were gonna sell stray cats.",
//     descriptionOfPrizes: "You can take home a cat"
//   });
// });
