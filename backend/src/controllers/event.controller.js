import Event from '../models/event.models.js';

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};
const getEvent = async (req, res) => {
const id = req.params.id;
const event = await Event.findById(id);
res.json(event);

}
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {createEvent,getEvents,updateEvent,deleteEvent,getEvent}