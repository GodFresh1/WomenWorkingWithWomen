'use strict';

// Get list of things
exports.submitRequest = function(req, res) {
  var newPartner = req.body;
  console.log(newPartner);
};

function handleError(res, err) {
  return res.status(500).send(err);
}
