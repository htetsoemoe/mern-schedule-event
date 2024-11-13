const mongoose = require('mongoose')
const eventSchemaModel = require('../models/event.model')

module.exports = class EventService {
    constructor() {
        this.eventCollectionName = `tbl_events`
        this.eventModel = mongoose.model(this.eventCollectionName, eventSchemaModel)
    }

    async createEvent(eventData) {
        return await this.eventModel.create(eventData)
    }

    async getEventById(eventId) {
        return await this.eventModel.findById(eventId)
    }
}