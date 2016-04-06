'use strict';

var express = require('express');
var controller = require('./volunteer.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.get('/properties/:firstName/:lastName/:email', controller.getOneWithProperties);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
