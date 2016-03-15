/**
 * GET     /donations              ->  getAll
 * POST    /donations              ->  create
 * GET     /donations/:id          ->  getOne
 * PUT     /donations/:id          ->  update
 * DELETE  /donations/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Donation = require('./donation.model');

// Get list of donations
exports.getAll = function(req, res) {
  Donation.find(function (err, donations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(donations);
  });
};

// Get a single donation
exports.getOne = function(req, res) {
  Donation.findById(req.params.id, function (err, donation) {
    if(err) { return handleError(res, err); }
    if(!donation) { return res.status(404).send('Not Found'); }
    return res.json(donation);
  });
};

// Creates a new donation in the DB.
exports.create = function(req, res) {
  Donation.create(req.body, function(err, donation) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(donation);
  });
};

// Updates an existing donation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Donation.findById(req.params.id, function (err, donation) {
    if (err) { return handleError(res, err); }
    if(!donation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(donation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(donation);
    });
  });
};

// Deletes a donation from the DB.
exports.destroy = function(req, res) {
  Donation.findById(req.params.id, function (err, donation) {
    if(err) { return handleError(res, err); }
    if(!donation) { return res.status(404).send('Not Found'); }
    Donation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
