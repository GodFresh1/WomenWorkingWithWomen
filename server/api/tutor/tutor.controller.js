/**
 * GET     /tutors             ->  getAll
 * POST    /tutors              ->  create
 * GET     /tutors/:id         ->  getOne
 * PUT     /tutors/:id         ->  update
 * DELETE  /tutors /:id         ->  destroy
 */

'use strict';

var _ = require('lodash');
var Tutor = require('./tutor.model');

// Get list of tutors  
exports.getAll = function(req, res) {
  Tutor.find(function (err, tutors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tutors);
  });
};

// Get a single tutor
exports.getOne = function(req, res) {
  Tutor.findById(req.params.id, function (err, tutor) {
    if(err) { return handleError(res, err); }
    if(!tutor) { return res.status(404).send('Not Found'); }
    return res.json(tutor);
  });
};

exports.getOneWithProperties = function(req, res){
  Tutor.findOne({firstName: req.params.firstName, lastName: req.params.lastName, email: req.params.email}, function(err, tutor){
    if(err) { return handleError(res, err); }
    if(!tutor) { return res.status(404).send('Not Found'); }
    return res.json(tutor);
  });
};

// Creates a new tutor in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Tutor.create(req.body, function(err, tutor) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(tutor);
  });
};

// Updates an existing tutorin the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tutor.findById(req.params.id, function (err, tutor) {
    if (err) { return handleError(res, err); }
    if(!tutor) { return res.status(404).send('Not Found'); }
    var updated = _.merge(tutor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tutor);
    });
  });
};

// Deletes a tutor from the DB.
exports.destroy = function(req, res) {
  Tutor.findById(req.params.id, function (err, tutor) {
    if(err) { return handleError(res, err); }
    if(!tutor) { return res.status(404).send('Not Found'); }
    tutor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
