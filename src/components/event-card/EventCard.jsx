import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import GuestForm from '../guest-form/GuestForm';
import EventForm from '../event-form/EventForm';
import "./eventCard.css"

const EventCard = ({ event, showViewGuestsButton, loadEvents }) => {
const navigate = useNavigate();
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false)
console.log(event);
  const handleGuestForm = () => {
    setShowGuestForm(true);
  };

  const handleCloseGuestForm = () => {
    setShowGuestForm(false);
    loadEvents();
  };
  const handleCloseEventForm =()=>{
    setShowEventForm(false);
    loadEvents();
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
      {showViewGuestsButton ? ( 
        
          <button onClick={handleViewGuest}>View Guests</button>
      ):(
        <><p>Event Description:{event.description}</p>
        <p> Event Category: {event.category}</p></>
      )}

      {showEventForm && <EventForm savedEvent={event} onClose={handleCloseEventForm}/> }

      <button onClick={handleEventForm}>Edit</button>
      {showGuestForm && <GuestForm eventId={event.id} onClose={handleCloseGuestForm} />}

      <button onClick={handleGuestForm}>Create Guest</button>
      </div>
    </div>
  );
};

export default EventCard;
