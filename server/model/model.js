const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    bssid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
    },
    attendence: String
})

const Bssdb = mongoose.model('bssdb', schema);


module.exports = Bssdb;