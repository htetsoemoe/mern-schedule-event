const EventService = require('../services/event.service')
const cron = require('node-cron')

// When a new event is created, it schedules a job to run at the event’s endTime.
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

        // Validate time frame
        if (new Date(eventData.startTime) >= new Date(eventData.endTime)) {
            return res.status(400).json({
                error: 'Start time must be before end time',
            })
        }

        // Create the event
        const createdEvent = await eventService.createEvent(eventData)

        // Calculate the time difference between the current time and event's endTime
        const currentTime = new Date()
        const eventEndTime = new Date(createdEvent.endTime)

        // Schedule the cron job dynamically for each new event to disable it at the exact endTime.
        if (eventEndTime > currentTime) {
            console.log(`Scheduling job for ${createdEvent.name}`)

            // Schedule a job to mark the event as inactive at endTime
            const job = cron.schedule(
                eventEndTime.getSeconds() + ' ' +
                eventEndTime.getMinutes() + ' ' +
                eventEndTime.getHours() + ' ' +
                eventEndTime.getDate() + ' ' +
                (eventEndTime.getMonth() + 1) +
                ' *',
                async () => {
                    // Calculate delay in milliseconds until the event endTime
                    // const delay = eventEndTime.getTime() - currentTime.getTime();
                    const delay = 1000 // 1 second delay 
                    if (delay > 0) {
                        setTimeout(async () => {
                            createdEvent.isActive = false;
                            await createdEvent.save();
                            console.log(`${createdEvent.name} event automatically stopped at ${eventEndTime}.`);
                        }, delay);
                    }
                    job.stop();
                }
            )
        }

        res.status(201).json({
            data: createdEvent,
            success: true,
            message: 'Event created successfully',
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const checkEventAccess = async (req, res) => {
    try {
        const eventId = req.params.eventId

        const eventService = new EventService()
        const foundedEvent = await eventService.getEventById(eventId)

        if (!foundedEvent) {
            return res.status(404).json({
                error: 'Event not found',
            })            
        }

        const currentTime = new Date()
        if (currentTime >= foundedEvent.startTime && currentTime <= foundedEvent.endTime) {
            res.status(200).json({
                message: `Event is active, accessible ${foundedEvent.name}`,
            })   
        } else {
            res.status(403).json({
                error: `Event is not active, not accessible ${foundedEvent.name}`,
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createEvent,
    checkEventAccess,
}