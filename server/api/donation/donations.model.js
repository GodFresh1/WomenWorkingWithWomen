'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DonationSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  amount: {type:Number, required:true},
  level: {type:String, required:true},
  email: {type:String, required:true},
});

DonationSchema.virtual('name').get(function(){
  return this.firstName + " " + this.lastName;
})

module.exports = mongoose.model('Donation', DonationSchema);
