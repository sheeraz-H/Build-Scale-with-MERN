const express = require('express');

// router package
const router = express.Router();

// router.get("/", (req, res) => {
//     res
//     .status(200)
//     .send("Wellcome out of content sheeraZ js")
// }) // or

// router response style
router.route("/").get((req, res) => {
    res
    .status(200)
    .send("Wellcome out of content sheeraZ js")
})

// router getting 2nd style.
router.route("/register").get((req, res) => {
    res
    .status(200)
    .send("Wellcome out of content register js")
})
module.exports = router;