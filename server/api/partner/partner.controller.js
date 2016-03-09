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

var sendEmailToRequestor = function(partnerRequest, res){
  // Get the message plaintext and html.
  var messageText = 'Hello ' + partnerRequest.firstName + " " + partnerRequest.lastName +
        '\nYour request has been received! We will get back to you shortly.';

  var messageHtml = '<h2>Hello ' +partnerRequest.firstName + " " + partnerRequest.lastName + '<br></h2>' +
        '<p>Your request has been received! We will get back to you shorty.</p>';

  var mailOptions = {
      from: 'Women Working With Women <Contact_Request@women_working.com>', // sender address
      to: partnerRequest.email, // list of receivers
      subject: 'Partner Request Received', // Subject line
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

var sendEmailToAdmins = function(partnerRequest, res){
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
          '\nName: ' + partnerRequest.firstName + " " + partnerRequest.lastName +
          '\nOrganization: ' + partnerRequest.organization +
          '\nEmail: ' + partnerRequest.email;

    var messageHtml = '<h2>New Partner Request Form<br></h2>' +
          '<b>Name: </b><p>' + partnerRequest.firstName + " " + partnerRequest.lastName + "</p>" +
          '<b>Organization: </b><p>' + partnerRequest.organization + "</p>" +
          '<b>Email: </b><p>' + partnerRequest.email + "</p>";

    // If a phone number was provided, add it to the text
    messageText += '\nPhone: ';
    messageHtml += '<b>Phone: </b>';
    if(partnerRequest.phone){
      messageText += partnerRequest.phone;
      messageHtml += '<p>' + partnerRequest.phone + '</p>';
    }else{
      messageText += "N/A";
      messageHtml += '<p>N/A</p>';
    }

    // If comments were provided, add it to the text
    messageText += '\nComments: '
    messageHtml += '<b>Comments: </b>';
    if(partnerRequest.comments){
      messageText += partnerRequest.comments;
      messageHtml += '<p>' + partnerRequest.comments + '</p>';
    }else{
      messageText += "N/A";
      messageHtml += '<p>N/A</p>';
    }

    var mailOptions = {
        from: 'Women Working With Women <Contact_Request@women_working.com>', // sender address
        to: adminEmails, // list of receivers
        subject: 'Partner Request', // Subject line
        text: messageText, // plaintext body
        html: messageHtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error) return handleError(res, error);
        console.log('Message sent: ' + info.response);
        return sendEmailToRequestor(partnerRequest, res);
    });
  })
};

function handleError(res, err){
  console.log(err);
  return res.status(500).send(err);
}
