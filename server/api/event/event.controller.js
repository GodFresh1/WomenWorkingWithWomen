/**
 * GET     /events              ->  getAll
 * POST    /events              ->  create
 * GET     /events/:id          ->  getOne
 * PUT     /events/:id          ->  update
 * DELETE  /events/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Event = require('./event.model');

// Get list of events
exports.getAll = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

// Get a single event
exports.getOne = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    var updated = _.merge(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    Event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.addAttendee = function(req, res){
  Event.update({'_id': req.params.id}, {$push: {'attendees': req.body}, function(err, result){
    if(err) { return handleError(res, err); }
    return res.status(200).json(result);
  }});
};

function handleError(res, err) {
  return res.status(500).send(err);
}
