const express = require('express');

// router package
const router = express.Router();

const { home } = require('../controllers/auth-controller')

const { register } = require('../controllers/auth-controller')

router.route("/").get(home);

// router getting 2nd style.
router.route("/register").get(register)

module.exports = router;