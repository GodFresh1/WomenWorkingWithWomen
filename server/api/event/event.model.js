'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: {type:String, required:true},
  start: {type:Date, required:true},
  end: {type:Date, required:true},
  vendors: [{type: mongoose.Types.ObjectId, ref: 'Vendor'}],
  attendees: [{type: Schema.Types.ObjectId, ref: 'Attendee'}],
  volunteers: [{type: mongoose.Types.ObjectId, ref: 'Volunteer'}], // I believe this will make it so the volunteers are stored by ID, but we can use functions like
                                                                   // Event.populate('volunteers') to actually work with objects instead of IDs. TODO: Test this.
  description: {type:String, required:true},
  location: {type:String, required:true},
  imgUrl: {type:String, required:true}
});

module.exports = mongoose.model('Event', EventSchema);
