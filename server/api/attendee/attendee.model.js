'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendeeSchema = new Schema({
  _id: {type:String, required:true}, // The id will be the attendee's email address.
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  phone: Number,
  gender: String,
  eventsAttended: [{type: mongoose.Types.ObjectId, ref: 'Event'}]
});

AttendeeSchema.virtual('email').get(function(){
  return this._id;
})

module.exports = mongoose.model('Attendee', AttendeeSchema);
