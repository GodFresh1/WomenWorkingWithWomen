'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Event = require('./event.model');

var event = new Event({
  title: "Test Event",
  start: new Date(2016, 11, 17, 2, 30, 0),
  end: new Date(2016, 11, 17, 4, 30, 0), // Note: this is a 2 hour event.
  description: "An event for testing.",
  location: "1234 Made Up St, Doesnt Exist, AL, 12345",
  imgUrl: "http://notarealurl.com"
});

describe('Event Model', function() {
  before(function(done) {
    // Clear events before testing
    Event.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done){
    // Set the event to this before each test is ran.
    event = new Event({
      title: "Test Event",
      start: new Date(2016, 11, 17, 2, 30, 0),
      end: new Date(2016, 11, 17, 4, 30, 0), // Note: this is a 2 hour event.
      description: "An event for testing.",
      location: "1234 Made Up St, Doesnt Exist, AL, 12345",
      imgUrl: "http://notarealurl.com"
    });
    done();
  });

  afterEach(function(done) {
    Event.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no events', function(done) {
    Event.find({}, function(err, events) {
      events.should.have.length(0);
      done();
    });
  });

  it('should respond with JSON array when reqesting /api/events', function(done) {
      request(app)
        .get('/api/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

  it('should fail when saving a duplicate event', function(done) {
    event.save(function() {
      var eventDup = new Event(event);
      eventDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a title', function(done) {
    event.title = '';
    event.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a start', function(done) {
    event.start = undefined;
    event.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an end', function(done) {
    event.end = undefined;
    event.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a description', function(done) {
    event.description = '';
    event.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a location', function(done) {
    event.location = '';
    event.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass when saving properly', function(done) {
    event.save(function(err) {
      should.not.exist(err);
      done();
    });
  });
});
