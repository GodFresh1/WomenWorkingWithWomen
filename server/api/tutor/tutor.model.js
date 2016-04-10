'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    EventSchema = require('../event/event.model');

var TutorSchema = new Schema({
  email: {type:String, required:true},
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  phone: {type:Number, required:true},
  age: {type:Number, required:true},
  gender: String,
  checkedIn: {type:Boolean, default:false},
  datesTutored: [Date]
});

TutorSchema.index({ firstName: 1, lastName: 1, email: 1}, { unique: true }); // requires firstName, lastName combination to be unique.

module.exports = mongoose.model('Tutor', TutorSchema);
