'use strict';

var nodemailer = require('nodemailer');
var config = require('../../config/environment');
var User = require('../user/user.model');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.smtp.uri);

// Get list of things
exports.submitRequest = function(req, res) {
  return sendEmailToAdmins(req.body, res);
};

var sendEmailToRequestor = function(contactRequest, res){
  // Get the message plaintext and html.
  var messageText = 'Hello ' + contactRequest.firstName + " " + contactRequest.lastName +
        '\nYour request has been received! We will get back to you shortly.';

  var messageHtml = '<h2>Hello ' +contactRequest.firstName + " " + contactRequest.lastName + '<br></h2>' +
        '<p>Your request has been received! We will get back to you shorty.</p>';

  var mailOptions = {
      from: 'Women Working With Women <Contact_Request@women_working.com>', // sender address
      to: contactRequest.email, // list of receivers
      subject: 'Contact Request Received', // Subject line
      text: messageText, // plaintext body
      html: messageHtml // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error) return handleError(res, error);
      console.log('Message sent: ' + info.response);
      return res.status(200).send('OK');
  });
}

var sendEmailToAdmins = function(contactRequest, res){
  // Forward the request to administrators.

  // Get all of the administrators
  User.find({role: "admin"}, function(err, admins){
    if (err) return handleError(res, err);

    // Concatonate all of the admin emails into a string.
    var adminEmails = "";
    admins.forEach(function(admin, index){
      if(index == admins.length - 1){
        adminEmails += admin.email;
      }else{
        adminEmails += admin.email + ", "
      }
    });

    // Get the message plaintext and html.
    var messageText = 'New Partner Requeset Received' +
          '\nName: ' + contactRequest.firstName + " " + contactRequest.lastName +
          '\nSubject: ' + contactRequest.subject +
          '\nEmail: ' + contactRequest.email;

    var messageHtml = '<h2>New Partner Request Form<br></h2>' +
          '<b>Name: </b><p>' + contactRequest.firstName + " " + contactRequest.lastName + "</p>" +
          '<b>Subject: </b><p>' + contactRequest.subject + "</p>" +
          '<b>Email: </b><p>' + contactRequest.email + "</p>";

    // If a phone number was provided, add it to the text
    messageText += '\nPhone: ';
    messageHtml += '<b>Phone: </b>';
    if(contactRequest.phone){
      messageText += contactRequest.phone;
      messageHtml += '<p>' + contactRequest.phone + '</p>';
    }else{
      messageText += "N/A";
      messageHtml += '<p>N/A</p>';
    }

    // If comments were provided, add it to the text
    messageText += '\nComments: '
    messageHtml += '<b>Comments: </b>';
    if(contactRequest.comments){
      messageText += contactRequest.comments;
      messageHtml += '<p>' + contactRequest.comments + '</p>';
    }else{
      messageText += "N/A";
      messageHtml += '<p>N/A</p>';
    }
    console.log("Sending email to: " + adminEmails);
    var mailOptions = {
        from: 'Women Working With Women <Contact_Request@women_working.com>', // sender address
        to: adminEmails, // list of receivers
        subject: 'Contact Request ✔', // Subject line
        text: messageText, // plaintext body
        html: messageHtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error) return handleError(res, error);
        console.log('Message sent: ' + info.response);
        return sendEmailToRequestor(contactRequest, res);
    });
  })
};

function handleError(res, err){
  console.log(err);
  return res.status(500).send(err);
}
