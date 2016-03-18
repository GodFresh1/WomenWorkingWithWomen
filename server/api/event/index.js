'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/addAttendee', controller.addAttendee);
router.delete('/:id', controller.destroy);

module.exports = router;
