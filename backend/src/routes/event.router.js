import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent ,getEvent}  from '../controllers/event.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import {roleMiddleware} from '../middleware/role.middleware.js';
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['Admin', 'Organizer']), createEvent);
router.get('/:id', authMiddleware,roleMiddleware(['Admin', 'Organizer']),getEvent);
router.get('/', authMiddleware, getEvents);
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'Organizer']), updateEvent);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteEvent);

export default router;
