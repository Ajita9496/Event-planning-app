import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './eventForm.css';

const EventForm = ({ initialEvent, onClose }) => {
  const history = useNavigate();
  const [event, setEvent] = useState(initialEvent);
  const [showModal, setShowModal] = useState(true); 

  useEffect(() => {
    setEvent(initialEvent);
  }, [initialEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const saveEvent = () => {
    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = event.id
      ? eventData.map((e) => (e.id === event.id ? { ...e, ...event } : e))
      : [...eventData, { ...event, id: new Date().getTime(), guests: [] }];

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    onClose(); 
    history('/');
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
        <form onSubmit={(e) => e.preventDefault()} className='create-form'>
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
<div  className='input-field'>
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
          
<div  className='input-field'> 
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
        <div  className='input-field'>
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
         
<div  className='input-field'>
<label htmlFor="eventDescription">Description</label>
          <textarea
            id="eventDescription"
            name="description"
            value={event.description}
            onChange={handleInputChange}
          ></textarea>

</div>
         <div  className='input-field'>
         <label htmlFor="eventCategory">Category</label>
          <select
            id="eventCategory"
            name="category"
            value={event.category}
            onChange={handleInputChange}
          >
            <option value="Celebration">Celebration</option>
          <option value="Conference">Conference</option>
          <option value="Sports">Sports</option>
          <option value="Exhibition">Exhibition</option>
            </select>
         </div>

          <button onClick={saveEvent}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
