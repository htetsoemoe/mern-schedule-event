const EventService = require('../services/event.service')

const createEvent = async (req, res) => {
    try {
        const eventService = new EventService()

        const { name, startTime, endTime } = req.body
        console.log(`${name} ${startTime} ${endTime}`)

        const eventData = {
            name,
            startTime,
            endTime
        }
        const createdEvent = await eventService.createEvent(eventData)

        res.status(201).json({
            data: createdEvent,
            success: true,
            message: 'Event created successfully',
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createEvent
}