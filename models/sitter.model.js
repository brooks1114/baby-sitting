//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const sitterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    neighborhood: {
        type: String,
        required: true,
        select: false
    },
    availability: {
        type: Array,
        required: true,
        select: false
    },
    rating: {
        type: Number,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    maxKidsWillingToWatch: {
        type: Number,
        required: true,
    },
})

//Generate the model our code with interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const Sitter = mongoose.model('Sitter', sitterSchema);

//export our model
module.exports = Sitter;