const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const interSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Candidate name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, 'Mpbile number is required'],
        unique: true
    },
    collegeId: {
        type: ObjectId,
        ref: "College"

    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamp: true });

module.exports = mongoose.model('Intern', interSchema);