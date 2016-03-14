'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VendorSchema = new Schema({
  jobTitle: {type:String, required:true},
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, required:true},
  phone: {type:Number, required:true},
  organizationName: {type:String, required:true},
  organizationAddress: {type:String, required:true},
  website: String,
  fax: Number,
  descriptionOfServices: {type:String, required:true},
  descriptionOfPrizes: {type:String, required:true},
  eventsAttended: [{type: mongoose.Types.ObjectId, ref: 'Event'}],
  approved: {type: Boolean, default:false}
});

module.exports = mongoose.model('Vendor', VendorSchema);
