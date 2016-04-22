'use strict';

var express = require('express');
var controller = require('./vendor.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/email-confirmation', controller.emailConfirmation);

module.exports = router;
