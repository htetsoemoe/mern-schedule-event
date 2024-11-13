const express = require('express');
const {
    createEvent,
    checkEventAccess,
} = require('../controllers/event.controller');

const eventRouter = express.Router();

eventRouter.post('/', createEvent);
eventRouter.get('/access/:eventId', checkEventAccess);

module.exports = eventRouter;