const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchemaModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true, // Event starts as active
    }
}, {
    timestamps: true,
})

module.exports = eventSchemaModel