import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '../event-card/EventCard';
import GuestCard from '../guest-card/GuestCard';
import './guestPage.css';

const GuestListPage = () => {
  const { eventId } = useParams();
  const [guests, setGuests] = useState([]);
  const [event, setEvent] = useState("")

  useEffect(() => {
    loadGuests();
  }, [eventId]);

  const loadGuests = () => {
    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    const selectedEvent = eventData.find((e) => e.id === parseInt(eventId, 10)) || {};
    setEvent(selectedEvent);
    setGuests(selectedEvent.guests || []);
  };
  return (
    <div className='guestPageContainer'>
      <h2 className='eventDetailsHeader'>
        Event Details
      </h2>
      <EventCard 
            event={event}
            showViewGuestsButton={false}
            loadEvents={loadGuests}
      />
      <h2 className='guestListHeader'>
        Guest List
      </h2>
      <div id="guestList">
        {guests.map(guest => (
          <GuestCard key = {guest.id} guest={guest} eventId={eventId} loadEvent={loadGuests} />
        ))}
      </div>
    </div>
  );
};

export default GuestListPage;
