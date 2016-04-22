'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schemaOptions = {
  toObject: {
    virtuals: true
  }
  ,toJSON: {
    virtuals: true
  }
};

var EventSchema = new Schema({
  title: {type:String, required:true},
  start: {type:Date, required:true},
  end: {type:Date, required:true},
  vendors: [{type: Schema.Types.ObjectId, ref: 'Vendor'}],
  attendees: [{type: Schema.Types.ObjectId, ref: 'Attendee'}],
  volunteers: [{type: Schema.Types.ObjectId, ref: 'Volunteer'}], // I believe this will make it so the volunteers are stored by ID, but we can use functions like
                                                                   // Event.populate('volunteers') to actually work with objects instead of IDs. TODO: Test this.
  description: {type:String, required:true},
  location: {type:String, required:true},
  imgUrl: {type:String},
  attendee_price: {type:Number, required:true},
  vendor_price: {type:Number, required:true}
}, schemaOptions);


var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

EventSchema.virtual('startDate').get(function () {
  var month = monthNames[this.start.getUTCMonth()]; //months from 1-12
  var day = this.start.getUTCDate();
  var year = this.start.getUTCFullYear();

  return month + " " + day + ", " + year;
});

EventSchema.virtual('startTime').get(function () {
  return this.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
});

EventSchema.virtual('endDate').get(function () {
  var month = monthNames[this.end.getUTCMonth()]; //months from 1-12
  var day = this.end.getUTCDate();
  var year = this.end.getUTCFullYear();

  return month + " " + day + ", " + year;
});

EventSchema.virtual('endTime').get(function () {
  return this.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
});

module.exports = mongoose.model('Event', EventSchema);
