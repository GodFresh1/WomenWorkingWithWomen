'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Attendee = require('./attendee.model');

var attendee = new Attendee({
  _id: "testEmail@email.com",
  firstName: "John",
  lastName: "Smith",
  phone: 12345678,
  age: 19
});

describe('Attendee Model', function() {
  before(function(done) {
    // Clear attendees before testing
    Attendee.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done){
    // Set the attendee to this before each test is ran.
    attendee = new Attendee({
      _id: "testEmail@email.com",
      firstName: "John",
      lastName: "Smith",
      phone: 12345678,
      age: 19
    });
    done();
  });

  afterEach(function(done) {
    Attendee.remove().exec().then(function() {
      done();
    });
  });
  it('should respond with JSON array when reqesting /api/attendees', function(done) {
      request(app)
        .get('/api/attendees')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

  it('should fail when saving a duplicate attendee', function(done) {
    attendee.save(function() {
      var attendeeDup = new Attendee(attendee);
      attendeeDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an id', function(done) {
    attendee._id = '';
    attendee.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a first name', function(done) {
    attendee.firstName = '';
    attendee.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a last name', function(done) {
    attendee.lastName = '';
    attendee.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass when saving properly', function(done) {
    attendee.save(function(err) {
      should.not.exist(err);
      done();
    });
  });
});
