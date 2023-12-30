import React, { useState, useEffect } from 'react';
import './eventForm.css';

const EventForm = ({ savedEvent, onClose }) => {
  const initialEvent = savedEvent || {
    id: '',
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: 'Celebration',
    guests: [],
  };

  const [event, setEvent] = useState(initialEvent);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setEvent(initialEvent);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const validateForm = () => {
    if (!event.name.trim()) {
      alert('Event name is required.');
      return false;
    }
    const currentDate = new Date();
  const selectedDate = new Date(event.date);
  if (!event.date || selectedDate <= currentDate) {
    alert('Please select a future date.');
    return false;
  }
    if (!event.time) {
      alert('Time is required.');
      return false;
    }
    if (!event.location.trim()) {
      alert('Location is required.');
      return false;
    }

    return true;
  };

  const saveEvent = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = event.id
      ? eventData.map((e) => (e.id === event.id ? { ...e, ...event } : e))
      : [...eventData, { ...event, id: new Date().getTime(), guests: [] }];

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    onClose();
  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className={`event-form-modal ${showModal ? 'visible' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h1>{event.id ? 'Edit Event' : 'Create Event'}</h1>

        <form onSubmit={saveEvent} className='create-form'>

          <div className='input-field'>
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="name"
              required
              value={event.name}
              onChange={handleInputChange}
            />
          </div>

          <div className='input-field'>
            <label htmlFor="eventDate">Date</label>
            <input
              type="date"
              id="eventDate"
              name="date"
              required
              value={event.date}
              onChange={handleInputChange}
            />
          </div>

          <div className='input-field'>
            <label htmlFor="eventTime">Time</label>
            <input
              type="time"
              id="eventTime"
              name="time"
              required
              value={event.time}
              onChange={handleInputChange}
            />
          </div>

          <div className='input-field'>
            <label htmlFor="eventLocation">Location</label>
            <input
              type="text"
              id="eventLocation"
              name="location"
              required
              value={event.location}
              onChange={handleInputChange}
            />
          </div>

          <div className='input-field'>
            <label htmlFor="eventDescription">Description</label>
            <textarea
              id="eventDescription"
              name="description"
              value={event.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className='input-field'>
            <label htmlFor="eventCategory">Category</label>
            <select
              id="eventCategory"
              name="category"
              value={event.category}
              onChange={handleInputChange}
            >
              {['Celebration', 'Conference', 'Sports', 'Exhibition'].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
