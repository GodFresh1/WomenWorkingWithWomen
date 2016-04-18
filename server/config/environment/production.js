'use strict';

// Production specific configuration
// =================================
module.exports = {

  /* PRODUCTION SHIT*/
  // Server IP
  // ip:       process.env.OPENSHIFT_NODEJS_IP ||
  //           process.env.IP ||
  //           undefined,
  //
  // // Server port
  // port:     process.env.OPENSHIFT_NODEJS_PORT ||
  //           process.env.PORT ||
  //           8080,
  //
  // // MongoDB connection options
  // mongo: {
  //   uri:    process.env.MONGOLAB_URI ||
  //           process.env.MONGOHQ_URL ||
  //           process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
  //           'mongodb://localhost/womenworkingwithwomen'
  // }

  /*DEV SHIT*/
  mongo: {
    uri: 'mongodb://dev:dev@ds055515.mongolab.com:55515/women_working_with_women'
  },
  seedDB: false,
  smtp: {
      uri: 'smtps://womenworkingcontactrequest%40gmail.com:womenworkingwithwomen@smtp.gmail.com'
    }
};
