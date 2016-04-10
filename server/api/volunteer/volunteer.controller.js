/**
 * GET     /volunteers              ->  getAll
 * POST    /volunteers              ->  create
 * GET     /volunteers/:id          ->  getOne
 * PUT     /volunteers/:id          ->  update
 * DELETE  /volunteers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Volunteer = require('./volunteer.model');

// Get list of volunteers
exports.getAll = function(req, res) {
  Volunteer.find(function (err, volunteers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(volunteers);
  });
};

// Get a single volunteer
exports.getOne = function(req, res) {
  Volunteer.findById(req.params.id, function (err, volunteer) {
    if(err) { return handleError(res, err); }
    if(!volunteer) { return res.status(404).send('Not Found'); }
    return res.json(volunteer);
  });
};

exports.getOneWithProperties = function(req, res){
  Volunteer.findOne({firstName: req.params.firstName, lastName: req.params.lastName, email: req.params.email}, function(err, volunteer){
    if(err) { return handleError(res, err); }
    if(!volunteer) { return res.status(404).send('Not Found'); }
    return res.json(volunteer);
  });
};

// Creates a new volunteer in the DB.
exports.create = function(req, res) {
  Volunteer.create(req.body, function(err, volunteer) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(volunteer);
  });
};



// Updates an existing volunteer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Volunteer.findById(req.params.id, function (err, volunteer) {
    if (err) { return handleError(res, err); }
    if(!volunteer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(volunteer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(volunteer);
    });
  });
};

exports.addEvent = function(req, res) {
  Event.update({'_id': req.params.id}, {$addToSet: {eventsAttended: req.body._id}}, function(err, result){
    if(err) { return handleError(res, err); }
    if(result.nModified==0) {
      return res.status(409).send("This volunteer has already attended.");
    }
    return res.status(200).json(result);
  });

};

// Deletes a volunteer from the DB.
exports.destroy = function(req, res) {
  Volunteer.findById(req.params.id, function (err, volunteer) {
    if(err) { return handleError(res, err); }
    if(!volunteer) { return res.status(404).send('Not Found'); }
    volunteer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
