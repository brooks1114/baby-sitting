//Import our model so we can us it to interact with the realated data in MongoDB
const Sitter = require("../models/sitter.model")


//build our controller that will have our CRUD and other methods for our sitters
const sitterController = {

    //method to get all sitters using async/await syntax
    getSitters: async function(req, res){

        //create base query
        let query = {}

        //if firstName filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.firstName){
            const regex = new RegExp(`.*${req.query.firstName}.*$`, "i")
            query.firstName = {'$regex':regex}
        }

        //if lastName filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.lastName){
            const regex = new RegExp(`.*${req.query.lastName}.*$`, "i")
            query.lastName = {'$regex':regex}
        }

        //if neighborhood filter appears in query parameters then modify the query to do an in list search
        if(req.query.neighborhood){
            // May need this fix if Array from FE does not play nice
            // const sp = req.query.neighborhood.split(", ")
            // query.neighborhood = {$in:sp}
            query.neighborhood = {$in:req.query.neighborhood}
        }

        //if availability filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.availability){
            query.availability = req.query.availability
        }
        // babysitter - [Mon, Thurs, Friday]
        // single date - calendar day

        //if rating filter appears in query parameters then modify the query to do a greater than or equal search
        if(req.query.rating){
            query.rating = {$gte:req.query.rating}
        }

        //if hourlyRate filter appears in query parameters then modify the query to do a less than or equal search
        if(req.query.hourlyRate){
            query.hourlyRate = {$lte:req.query.hourlyRate}
        }

        //if maxKidsWillingToWatch filter appears in query parameters then modify the query to do a greater than or equal search
        if(req.query.maxKidsWillingToWatch){
            query.maxKidsWillingToWatch = {$gte:req.query.maxKidsWillingToWatch}
        }

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find sitters that match a query.
            //{} is the current query which really mean find all the sitters
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allSitters = await Sitter.find(query).sort(req.query.sort)
            
            //return all the sitters that we found in JSON format
            res.json(allSitters)
            
        } catch (error) {
            console.log("error getting all sitters: " + error)
            //if any code in the try block fails, send the sitter a HTTP status of 400 and a message stating we could not find any sitters
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },
    //method to create a new sitter
    createSitter: async function(req, res){

        try {

            //store sitter data sent through the request
            const sitterData = req.body;

            //pass the sitterData to the create method of the Sitter model
            let newSitter = await Sitter.create(sitterData)

            //return the newly created sitter
            res.status(201).json(await Sitter.findById(newSitter._id))
            
        } catch (error) {
            //handle errors creating sitter
            console.log("failed to create sitter: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    }
}

module.exports = sitterController;
