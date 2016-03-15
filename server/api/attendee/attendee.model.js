'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    EventSchema = require('../event/event.model');

var AttendeeSchema = new Schema({
  _id: {type:String, required:true}, // The id will be the attendee's email address.
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  phone: {type:Number, required:true},
  age: {type:Number, required:true},
  gender: String,
  eventsAttended: [String]
});

AttendeeSchema.virtual('email').get(function(){
  return this._id;
})

module.exports = mongoose.model('Attendee', AttendeeSchema);
