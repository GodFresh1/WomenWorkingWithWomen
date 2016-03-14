'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VolunteerSchema = new Schema({
  _id: {type:String, required:true}, // The id will be the volunteer's email address.
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  phone: Number,
  eventsAttended: [{type: mongoose.Types.ObjectId, ref: 'Event'}]
});

VolunteerSchema.virtual('email').get(function(){
  return this._id;
})

module.exports = mongoose.model('Volunteer', VolunteerSchema);