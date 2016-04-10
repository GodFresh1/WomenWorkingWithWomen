'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VolunteerSchema = new Schema({
  email: {type:String, required:true}, // The id will be the volunteer's email address.
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  phone: Number,
  gender: String,
  age: Number,
  checkedIn: {type:Boolean, default:false},
  events: [{type: mongoose.Types.ObjectId, ref: 'Event'}] //events attended
});

/*VolunteerSchema.virtual('email').get(function(){
  return this._id;
})*/

VolunteerSchema.index({ firstName: 1, lastName: 1, email: 1}, { unique: true });

module.exports = mongoose.model('Volunteer', VolunteerSchema);
