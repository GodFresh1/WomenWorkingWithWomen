'use strict';

var express = require('express');
var controller = require('./contact.controller');

var router = express.Router();

router.post('/submit-request', controller.submitRequest);

module.exports = router;
