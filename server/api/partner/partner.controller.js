'use strict';

var nodemailer = require('nodemailer');
var config = require('../../config/environment');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.smtp.uri);

// Get list of things
exports.submitRequest = function(req, res) {
  sendEmailToAdmins(req.body);

};

var sendEmailToAdmins = function(parterRequest){
  // Forward the request to administrators.
  var mailOptions = {
      from: 'Women Working With Women Foo 👥 <Contact_Request@women_working.com>', // sender address
      to: 'bradleymtreuherz@gmail.com, baz@blurdybloop.com', // list of receivers
      subject: 'Contact Request ✔', // Subject line
      text: 'We have received your contact request!', // plaintext body
      html: '<b>We will get back to you shortly!</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
