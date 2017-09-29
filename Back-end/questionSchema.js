const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
        _id: {type: Number, required: true},
        question: {type: String, required: true},
        questionType: {type: Number, default: 0},
        yes: {type: Number, default: 0},
    }
);

module.exports = mongoose.model('questions', questionSchema);