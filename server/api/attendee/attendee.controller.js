/**
 * GET     /attendees              ->  getAll
 * POST    /attendees              ->  create
 * GET     /attendees/:id          ->  getOne
 * PUT     /attendees/:id          ->  update
 * DELETE  /attendees/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
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

// Creates a new attendee in the DB.
exports.create = function(req, res) {
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
    Attendee.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
