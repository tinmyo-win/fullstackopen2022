/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
console.log('connecting to MongoDB');

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDb');
    })
    .catch((error) => {
        console.log('errror conncting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator(v) {
                return /\d{2,3}-\d[0-9]{4,}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number`,
        },
        minLength: 9,
        required: true,
    },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Person', personSchema);
