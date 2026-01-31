const express = require('express');

// router package
const router = express.Router();

const authController = require('../controllers/auth-controller')

router.route("/").get(authController.home);

// router getting 2nd style.
router.route("/register").post(authController.register)

module.exports = router;