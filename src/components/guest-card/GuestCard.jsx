
import React, { useEffect, useState } from 'react';
import GuestForm from '../guest-form/GuestForm';
import "./guestCard.css"

const GuestCard = ({ guest, eventId, loadEvent }) => {
  const [showGuestForm, setShowGuestForm] = useState(false);

  const handleGuestForm = () => {
    setShowGuestForm(true);
  };
  const handleCloseGuestForm = () => {
    setShowGuestForm(false);
    loadEvent();
  };

  return (
    <div className="guestCard">
      <div className='guestDetails'>
      <h3>{guest.name}</h3>
      <p>Email: {guest.email}</p>
      <p>RSVP: {guest.rsvp}</p>
      <p>Comments: {guest.comments || 'N/A'}</p>
      </div>
      {showGuestForm && (
        <GuestForm
          eventId={eventId}
          guestId={guest.id} 
          onClose={handleCloseGuestForm}
        />
      )}
      <button className="guestCardButton"onClick={handleGuestForm}>Edit Guest</button>
    </div>
  );
};

export default GuestCard;
