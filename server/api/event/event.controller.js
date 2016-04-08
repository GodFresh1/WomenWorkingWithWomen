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
// exports.getAll = function(req, res) {
//   Event.find(function (err, events) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(events);
//   });
// };

exports.getAll = function(req, res){
  Event.find()
  .populate('attendees')
  .populate('vendors')
  .populate('volunteers')
  .exec(function(err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
}

// Get a single event NOTE: This method does not populate the arrays.
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
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.addAttendee = function(req, res){
  Event.update({'_id': req.params.id}, {$addToSet: {attendees: req.body._id}}, function(err, result){
    if(err) { return handleError(res, err); }
    if(result.nModified==0){
      return res.status(409).send("You have already registered for this event.");
    }
    return res.status(200).json(result);
  });
};

exports.addVolunteer = function(req, res) {
  Event.update({'_id': req.params.id}, {$addToSet: {volunteers: req.body._id}}, function(err, result){
    if(err) { return handleError(res, err); }
    if(result.nModified==0) {
      return res.status(409).send("You have already signed up for this event.");
    }
    return res.status(200).json(result);
  });

};


exports.addVendor = function(req, res){
  Event.update({'_id': req.params.id}, {$addToSet: {vendors: req.body._id}}, function(err, result){
    if(err) { return handleError(res, err); }
    if(result.nModified==0){
      return res.status(409).send("You have already registered for this event.");
    }
    return res.status(200).json(result);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
};
