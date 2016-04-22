/**
 * GET     /attendees              ->  getAll
 * POST    /attendees              ->  create
 * GET     /attendees/:id          ->  getOne
 * PUT     /attendees/:id          ->  update
 * DELETE  /attendees/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');
var Attendee = require('./attendee.model');

// Get list of attendees
exports.getAll = function(req, res) {
  Attendee.find(function (err, attendees) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(attendees);
  });
};

// Get a single attendee
exports.getOne = function(req, res) {
  Attendee.findById(req.params.id, function (err, attendee) {
    if(err) { return handleError(res, err); }
    if(!attendee) { return res.status(404).send('Not Found'); }
    return res.json(attendee);
  });
};

exports.getOneWithProperties = function(req, res){
  Attendee.findOne({firstName: req.params.firstName, lastName: req.params.lastName, email: req.params.email}, function(err, attendee){
    if(err) { return handleError(res, err); }
    if(!attendee) { return res.status(404).send('Not Found'); }
    return res.json(attendee);
  });
};

// Creates a new attendee in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Attendee.create(req.body, function(err, attendee) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(attendee);
  });
};

// Updates an existing attendee in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attendee.findById(req.params.id, function (err, attendee) {
    if (err) { return handleError(res, err); }
    if(!attendee) { return res.status(404).send('Not Found'); }
    var updated = _.merge(attendee, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(attendee);
    });
  });
};

// Deletes a attendee from the DB.
exports.destroy = function(req, res) {
  Attendee.findById(req.params.id, function (err, attendee) {
    if(err) { return handleError(res, err); }
    if(!attendee) { return res.status(404).send('Not Found'); }
    attendee.remove(function(err) {
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
exports.submitRequest = function(req, res) {
  return sendEmailToRequestor(req.body, res);
};

var sendEmailToRequestor = function(attendee, res){
  // Get the message plaintext and html.
  var messageText = 'Hello ' + attendee.firstName + " " + attendee.lastName +
        '\nYour registration has been received! Here is your confirmation email.' +
        '\n\nName: ' + attendee.firstName + " " + attendee.lastName +
        '\nEmail: ' + attendee.email +
        '\nPhone: ' + attendee.phone +
        '\nAge: ' + attendee.age +
        '\nGender: ' + attendee.gender +
        '\nWill you participate in the fashion show?: ' + attendee.fashion +
        '\n\nIf you have any questions please contact Belinda Smith at 4wsbms@gmail.com';

  var messageHtml = '<h2>Hello ' +attendee.firstName + " " + attendee.lastName + '<br></h2>' +
        '<p>Your registration has been received! Here is your confirmation email.</p>' +
        '<p>Name: ' + attendee.firstName + " " + attendee.lastName + '</p>' +
        '<p>Email: ' + attendee.email + '</p>' +
        '<p>Phone: ' + attendee.phone + '</p>' +
        '<p>Age: ' + attendee.age + '</p>' +
        '<p>Gender: ' + attendee.gender + '</p>' +
        '<p>Will you participate in the fashion show?: ' + attendee.fashion + '</p>' +
        '<p>If you have any questions please contact Belinda Smith at 4wsbms@gmail.com</p>';

  var mailOptions = {
      from: 'Women Working With Women <Conference_Registration@women_working.com>', // sender address
      to: attendee.email, // list of receivers
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
