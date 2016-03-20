'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Donation = require('./donations.model');

var donation = new Donation({
  _id: "swag@swag.com",
  firstName: "John",
  lastName: "Smith",
  amount: 12345678,
  level: "diamond"
});

describe('Donation Model', function() {
  before(function(done) {
    // Clear donations before testing
    Donation.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done){
    // Set the donation to this before each test is ran.
    donation = new Donation({
      _id: "swag@swag.com",
      firstName: "John",
      lastName: "Smith",
      amount: 12345678,
      level: "diamond"
    });
    done();
  });

  afterEach(function(done) {
    Donation.remove().exec().then(function() {
      done();
    });
  });
  it('should respond with JSON array when reqesting /api/donations', function(done) {
      request(app)
        .get('/api/donations') // donations
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

  it('should fail when saving a duplicate donation', function(done) {
    donation.save(function() {
      var donationDup = new Donation(donation);
      donationDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an id', function(done) {
    donation._id = '';
    donation.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a first name', function(done) {
    donation.firstName = '';
    donation.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a last name', function(done) {
    donation.lastName = '';
    donation.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass when saving properly', function(done) {
    donation.save(function(err) {
      should.not.exist(err);
      done();
    });
  });
});
