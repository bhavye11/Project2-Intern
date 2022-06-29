const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'College fullname is required'],
    },
    logoLink: {
        type: String,
        required: [true, 'Logo link is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);

