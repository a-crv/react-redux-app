var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Get all id\'s');
});

router.get('/:id', function(req, res, next) {
  res.send(`Get by ${req.params.id}`);
});

router.post('/', function(req, res, next) {
  res.send('Post new id');
});

router.put('/:id', function(req, res, next) {
  res.send(`Update ${req.params.id}`);
});


router.delete('/:id', function(req, res, next) {
  res.send(`Delete ${req.params.id}`);
});

module.exports = router;
