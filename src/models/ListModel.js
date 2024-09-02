const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    building: {type:String, required: true},
    street: {type: String, required: true},
    coord: [Number],
    zipcode: {type: String, required: true},
});


const gradeSchema = new Schema({
    date: { type: Date, required: true },
    grade: { type: String, required: true },
    score: { type: Number, required: true }
});

const listSchema = new Schema({
    address: [addressSchema],
    borough: { type: String, required: true},
    cuisine: { type: String, required: true},
    grades: [gradeSchema],
    name: { type: String, required: true},
    restaurant_id: { type: String, required: true},

});

const List = mongoose.model('restaurants', listSchema);

module.exports = List;