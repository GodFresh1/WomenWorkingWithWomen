'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://production:production@ds011251.mlab.com:11251/women-working-with-women'
  },
  seedDB: false,
  smtp: {
      uri: 'smtps://womenworkingcontactrequest%40gmail.com:womenworkingwithwomen@smtp.gmail.com'
    }
};
