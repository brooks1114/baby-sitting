const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const appointmentController = require("../controllers/appointment.controller")

//post route to create an appointment (appointment registration)
router.post("/:email", validateJwtMiddleware, appointmentController.createAppointment)

//get route to return all appointments for 1 user (requires auth)
router.get("/:email", appointmentController.getAppointment)

//get route to return all appointments for 1 user (requires auth)
router.put("/:id", appointmentController.updateAppointment)


//TODO Delete?

module.exports = router;
