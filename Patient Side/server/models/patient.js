const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    patientAdhar:{
        type: String,
        required: true,
    },
    patientWalletAdress:{
        type: String,
        required: true,
    }
});

const patient = mongoose.model("Patient-Sign-Up", patientSchema);
module.exports = patient;