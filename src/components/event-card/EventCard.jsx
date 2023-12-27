import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import GuestForm from '../guest-form/GuestForm';
import EventForm from '../event-form/EventForm';
import "./eventCard.css"

const EventCard = ({ event, showViewGuestsButton }) => {
const navigate = useNavigate();
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false)

  const handleGuestForm = () => {
    setShowGuestForm(true);
  };

  const handleCloseGuestForm = () => {
    setShowGuestForm(false);
  };
  const handleCloseEventForm =()=>{
    setShowEventForm(false);
  }
  const handleEventForm =()=>{
    setShowEventForm(true);
  }
  const handleViewGuest=()=>{
    navigate(`./event-guests/${event.id}`)
  }

  return (
    <div className="eventCard">
      <div className='eventDetails'>
      <h2>{event.name}</h2>

      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      </div>
      <div className='eventCardButtons'>
      {showViewGuestsButton && ( 
        
          <button onClick={handleViewGuest}>View Guests</button>
      )}
      {showEventForm && <EventForm initialEvent={event} onClose={handleCloseEventForm}/> }

      <button onClick={handleEventForm}>Edit</button>
      {showGuestForm && <GuestForm eventId={event.id} onClose={handleCloseGuestForm}  />}

      <button onClick={handleGuestForm}>Create Guest</button>
      </div>
    </div>
  );
};

export default EventCard;
