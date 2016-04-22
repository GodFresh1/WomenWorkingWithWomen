'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://dev:dev@ds055515.mongolab.com:55515/women_working_with_women'
  },
  seedDB: false,
  smtp: {
      uri: 'smtps://womenworkingwithwomenapp%40gmail.com:womenworking1@smtp.gmail.com'
    }
};
