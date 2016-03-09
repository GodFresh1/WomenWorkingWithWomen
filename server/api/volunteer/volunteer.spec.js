'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Volunteer = require('./volunteer.model');

var volunteer = new Volunteer({
  _id: "testEmail@email.com",
  name: "John Smith",
  phone: 12345678
});

describe('Volunteer Model', function() {
  before(function(done) {
    // Clear volunteers before testing
    Volunteer.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done){
    // Set the volunteer to this before each test is ran.
    volunteer = new Volunteer({
      _id: "testEmail@email.com",
      name: "John Smith",
      phone: 12345678
    });
    done();
  });

  afterEach(function(done) {
    Volunteer.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no volunteers', function(done) {
    Volunteer.find({}, function(err, volunteers) {
      volunteers.should.have.length(0);
      done();
    });
  });

  it('should respond with JSON array when reqesting /api/volunteers', function(done) {
      request(app)
        .get('/api/volunteers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

  it('should fail when saving a duplicate volunteer', function(done) {
    volunteer.save(function() {
      var volunteerDup = new Volunteer(volunteer);
      volunteerDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an id', function(done) {
    volunteer._id = '';
    volunteer.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a name', function(done) {
    volunteer.name = '';
    volunteer.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass when saving properly', function(done) {
    volunteer.save(function(err) {
      should.not.exist(err);
      done();
    });
  });
});
