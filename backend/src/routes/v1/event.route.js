const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/auth")
const eventValidation = require("../../validations/event.validation")
const router = express.Router();
const { eventController } = require("../../controllers/")

router.get("/",auth(),eventController.getEvents);

router.post("/",auth(),eventController.addEvent);

router.put("/update",validate(eventValidation.updateEvent),auth(),eventController.updateEvent);

router.put("/delete",validate(eventValidation.updateEvent),auth(),eventController.deleteEvent);

module.exports = router;
