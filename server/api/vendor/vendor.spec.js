'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Vendor = require('./vendor.model');

var vendor = new Vendor({
  jobTitle: "Salesman",
  firstName: "Richard",
  lastName: "Hurts",
  email: "Email@email.email",
  phone: 12345678,
  organizationName: "NAME NAME",
  organizationAddress: "1234 this is an address",
  descriptionOfServices: "Were gonna sell stray cats.",
  descriptionOfPrizes: "You can take home a cat"
});

describe('Vendor Model', function() {
  before(function(done) {
    // Clear vendors before testing
    Vendor.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done){
    // Set the vendor to this before each test is ran.
    vendor = new Vendor({
      jobTitle: "Salesman",
      firstName: "Richard",
      lastName: "Hurts",
      email: "Email@email.email",
      phone: 12345678,
      organizationName: "NAME NAME",
      organizationAddress: "1234 this is an address",
      descriptionOfServices: "Were gonna sell stray cats.",
      descriptionOfPrizes: "You can take home a cat"
    });
    done();
  });

  afterEach(function(done) {
    Vendor.remove().exec().then(function() {
      done();
    });
  });
  it('should respond with JSON array when reqesting /api/vendors', function(done) {
      request(app)
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

  it('should fail when saving a duplicate vendor', function(done) {
    vendor.save(function() {
      var vendorDup = new Vendor(vendor);
      vendorDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without title', function(done) {
    vendor.jobTitle = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a first name', function(done) {
    vendor.firstName = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a last name', function(done) {
    vendor.lastName = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an email address', function(done) {
    vendor.email = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an phone number', function(done) {
    vendor.phone = undefined;
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an organizaitonName', function(done) {
    vendor.organizationName = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an organizationAddress', function(done) {
    vendor.organizationAddress = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a descriptionOfServices', function(done) {
    vendor.descriptionOfServices = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a descriptionOfPrizes', function(done) {
    vendor.descriptionOfPrizes = '';
    vendor.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass when saving properly', function(done) {
    vendor.save(function(err) {
      should.not.exist(err);
      done();
    });
  });
});
