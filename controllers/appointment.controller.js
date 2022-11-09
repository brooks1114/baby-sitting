//Import our model so we can us it to interact with the realated data in MongoDB
const Appointment = require("../models/appointment.model")


//build our controller that will have our CRUD and other methods for our sitters
const appointmentController = {


    //method to get all sitters using async/await syntax
    getAppointment: async function (req, res) {

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {

            //get the email address of the user from the url parameters
            const userEmail = req.params.email;

            //use our model to find the user that match a query.
            //{email: some@email.com} is the current query which really mean find the user with that email
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            //The user may have more than one appointment so find and return all appointments in query
            let findAllAppointments = await Appointment.findById({ email: userEmail })

            //if we found the user, return that user otherwise return a 404
            if (findAllAppointments) {
                res.json(findAllAppointments)
            } else {
                res.status(404).send({
                    status: res.statusCode,
                    message: "This User does not have any Appointments scheduled yet!"
                })
            }

        } catch (error) {
            console.log("System error getting user appointments: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },
    //method to create a new appointment
    createAppointment: async function (req, res) {

        try {

            //store appointment data sent through the request
            const appointmentData = req.body;

            //pass the sitterData to the create method of the Sitter model
            let newAppointment = await Appointment.create(appointmentData)

            //return the newly created sitter
            res.status(201).json(await Appointment.findById(newAppointment._id))

        } catch (error) {
            //handle errors creating sitter
            console.log("failed to create appointment: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    }
}

module.exports = appointmentController;
