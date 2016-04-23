/**
 * GET     /vendors              ->  getAll
 * POST    /vendors              ->  create
 * GET     /vendors/:id          ->  getOne
 * PUT     /vendors/:id          ->  update
 * DELETE  /vendors/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');
var Vendor = require('./vendor.model');

// Get list of vendors
exports.getAll = function(req, res) {
  Vendor.find(function (err, vendors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(vendors);
  });
};

// Get a single vendor
exports.getOne = function(req, res) {
  Vendor.findById(req.params.id, function (err, vendor) {
    if(err) { return handleError(res, err); }
    if(!vendor) { return res.status(404).send('Not Found'); }
    return res.json(vendor);
  });
};

// Creates a new vendor in the DB.
exports.create = function(req, res) {
  Vendor.create(req.body, function(err, vendor) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(vendor);
  });
};

// Updates an existing vendor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Vendor.findById(req.params.id, function (err, vendor) {
    if (err) { return handleError(res, err); }
    if(!vendor) { return res.status(404).send('Not Found'); }
    var updated = _.merge(vendor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(vendor);
    });
  });
};

// Deletes a vendor from the DB.
exports.destroy = function(req, res) {
  Vendor.findById(req.params.id, function (err, vendor) {
    if(err) { return handleError(res, err); }
    if(!vendor) { return res.status(404).send('Not Found'); }
    vendor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.smtp.uri);

// Get list of things
exports.emailConfirmation = function(req, res) {
  return sendEmailToAdmins(req.body, res);
};

var sendEmailToRequestor = function(vendor, res){
  // Get the message plaintext and html.
  var messageText = 'Hello ' + vendor.firstName + " " + vendor.lastName +
        '\nYour registration has been received! Here is your confirmation email.' +
        '\n\nName: ' + vendor.firstName + " " + vendor.lastName +
        '\nEmail: ' + vendor.email +
        '\nJob Title: ' + vendor.jobTitle +
        '\nPhone: ' + vendor.phone +
        '\nOrganization Name: ' + vendor.organizationName +
        '\nOrganization Address: ' + vendor.organizationAddress + 
        '\nWebsite: ' + vendor.website +
        '\nFax: ' + vendor.fax +
        '\nDescription of Services: ' + vendor.descriptionOfServices +
        '\nDescription of Prizes: ' + vendor.descriptionOfPrizes +
        '\nEvents registered: ' + vendor.eventsAttended +
        '\n\nIf you have any questions please contact Belinda Smith at 4wsbms@gmail.com';

  var messageHtml = '<h2>Hello ' + vendor.firstName + " " + vendor.lastName + '<br></h2>' +
        '<p>Your registration has been received! Here is your confirmation email.</p>'+
        '<p>Name: ' + vendor.firstName + " " + vendor.lastName + '</p>' +
        '<p>Email: ' + vendor.email + '</p>' +
        '<p>Job Title: ' + vendor.jobTitle + '</p>' +
        '<p>Phone: ' + vendor.phone + '</p>' +
        '<p>Organization Name: ' + vendor.organizationName + '</p>' +
        '<p>Organization Address: ' + vendor.organizationAddress + '</p>' +
        '<p>Website: ' + vendor.website + '</p>' +
        '<p>Fax: ' + vendor.fax + '</p>' +
        '<p>Description of Services: ' + vendor.descriptionOfServices + '</p>' +
        '<p>Description of Prizes: ' + vendor.descriptionOfPrizes + '</p>' +
        '<p>Events registered: ' + vendor.eventsAttended + '</p>' +
        '<p>If you have any questions please contact Belinda Smith at 4wsbms@gmail.com</p>';


  var mailOptions = {
      from: 'Women Working With Women <Conference_Registration@women_working.com>', // sender address
      to: vendor.email, // list of receivers
      subject: 'Women Working With Women Conference Registration Confirmation', // Subject line
      text: messageText, // plaintext body
      html: messageHtml // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error) return handleError(res, error);
      console.log('Message sent: ' + info.response);
      return res.status(200).send('OK');
  });
};

var sendEmailToAdmins = function(vendor, res){
  // Forward the request to administrators.

    // Get the message plaintext and html.
    var messageText = 'New Vendor Registration' +
        '\n\nName: ' + vendor.firstName + " " + vendor.lastName +
        '\nEmail: ' + vendor.email +
        '\nJob Title: ' + vendor.jobTitle +
        '\nPhone: ' + vendor.phone +
        '\nOrganization Name: ' + vendor.organizationName +
        '\nOrganization Address: ' + vendor.organizationAddress + 
        '\nWebsite: ' + vendor.website +
        '\nFax: ' + vendor.fax +
        '\nDescription of Services: ' + vendor.descriptionOfServices +
        '\nDescription of Prizes: ' + vendor.descriptionOfPrizes +
        '\nEvents registered: ' + vendor.eventsAttended;

    var messageHtml = '<h2>New Vendor Registration<br></h2>' +
        '<p>Name: ' + vendor.firstName + " " + vendor.lastName + '</p>' +
        '<p>Email: ' + vendor.email + '</p>' +
        '<p>Job Title: ' + vendor.jobTitle + '</p>' +
        '<p>Phone: ' + vendor.phone + '</p>' +
        '<p>Organization Name: ' + vendor.organizationName + '</p>' +
        '<p>Organization Address: ' + vendor.organizationAddress + '</p>' +
        '<p>Website: ' + vendor.website + '</p>' +
        '<p>Fax: ' + vendor.fax + '</p>' +
        '<p>Description of Services: ' + vendor.descriptionOfServices + '</p>' +
        '<p>Description of Prizes: ' + vendor.descriptionOfPrizes + '</p>' +
        '<p>Events registered: ' + vendor.eventsAttended + '</p>';

    var mailOptions = {
        from: 'Women Working With Women <Vendor_Request@women_working.com>', // sender address
        to: '4wskhs@gmail.com', // list of receivers
        subject: 'New Vendor Registration', // Subject line
        text: messageText, // plaintext body
        html: messageHtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error) return handleError(res, error);
        console.log('Message sent: ' + info.response);
        return sendEmailToRequestor(vendor, res);
    });
};