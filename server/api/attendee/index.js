'use strict';

var express = require('express');
var controller = require('./attendee.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/properties/:firstName/:lastName/:email', controller.getOneWithProperties);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
