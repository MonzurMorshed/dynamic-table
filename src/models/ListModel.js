const mongoose = require('mongoose');
const { schema } = mongoose;

const addressSchema = new Schema({
    building: {type:text, required: true},
    street: {type: text, required: true},
    zipcode: {type: text, required: true},
});

// const gradeSchema = 