const express = require('express');
const signup = require('../controllers/signup');
const signin = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
