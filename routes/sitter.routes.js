const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const sitterController = require("../controllers/sitter.controller")

//post route to create a sitter (sitter registration)
router.post("/", sitterController.createSitter) // add auth when sitter login is implemented

//get route to return all sitters (requires auth)
router.get("/", validateJwtMiddleware, sitterController.getSitters)

module.exports = router;
