const express = require("express");
const eventRoute = require("./event.route");
const authRoute = require("./auth.route");

const router = express.Router();

router.use("/events",eventRoute);
router.use("/auth",authRoute); 

module.exports = router;