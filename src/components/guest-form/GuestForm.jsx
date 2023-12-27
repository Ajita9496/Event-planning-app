import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './guestForm.css'; 
import _debounce from 'lodash/debounce';



const GuestForm = ({ eventId, guestId, onClose }) => {
  const { eventId: routeEventId } = useParams();
  const [guest, setGuest] = useState({ name: '', email: '', rsvp: '', comments: '' });
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (eventId === routeEventId && guestId) {
      const eventData = JSON.parse(localStorage.getItem('events')) || [];
      const selectedEvent = eventData.find((e) => e.id === parseInt(eventId, 10)) || {};
      const selectedGuest = selectedEvent.guests.find((g) => g.id === parseInt(guestId, 10)) || {};
      setGuest(selectedGuest);
    }
  }, [eventId, guestId, routeEventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevGuest) => ({ ...prevGuest, [name]: value }));
  };
 

  const saveGuest = () => {
    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = eventData.map((e) =>
      e.id === parseInt(eventId, 10)
        ? {
            ...e,
            guests: guestId
              ? e.guests.map((g) => (g.id === parseInt(guestId, 10) ? guest : g))
              : [...e.guests, { ...guest, id: new Date().getTime() }],
          }
        : e
    );

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    onClose();

  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className={`guest-form-modal ${showModal ? 'visible' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h1>{guestId ? 'Edit Guest' : 'Create Guest'}</h1>
        <form onSubmit={(e) => e.preventDefault()} className='create-form'>
          <div className='input-field'>
          <label htmlFor="guestName">Name</label>
        <input
          type="text"
          id="guestName"
          name="name"
          required
          value={guest.name}
          onChange={handleInputChange}
        />

          </div>
       <div className='input-field'>
       <label htmlFor="guestEmail">Email</label>
        <input
          type="email"
          id="guestEmail"
          name="email"
          required
          value={guest.email}
          onChange={handleInputChange}
        />
       </div>
        <div className='input-field'>
        <label htmlFor="guestRSVP">RSVP Status</label>
        <select id="guestRSVP" name="rsvp" value={guest.rsvp} onChange={handleInputChange}>
          <option value="Attending">Attending</option>
          <option value="Not Attending">Not Attending</option>
          <option value="Pending">Pending</option>
        </select>
        </div>
        
<div className='input-field'>
<label htmlFor="guestComments">Comments*</label>
        <textarea
          id="guestComments"
          name="comments"
          value={guest.comments}
          onChange={handleInputChange}
        />
</div>
        <button onClick={saveGuest}>Save</button>
      </form>
    </div>
    </div>
  );
};

export default GuestForm;
