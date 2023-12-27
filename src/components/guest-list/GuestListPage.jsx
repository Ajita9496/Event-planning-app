import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import EventCard from '../event-card/EventCard';
import GuestCard from '../guest-card/GuestCard';
import './guestPage.css';

const GuestListPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    guests: [],
  });

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = () => {
    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    const selectedEvent = eventData.find((e) => e.id === parseInt(eventId, 10)) || {};
    setEvent(selectedEvent);
  };

  const handleGuestChange = () => {
    loadEvent();
  };
  return (
    <div className='guestPageContainer'>
      <h2 className='eventDetailsHeader'>
        Event Details
      </h2>
      <EventCard 
            key={event.id}
            event={event}
            showViewGuestsButton={false}
            className="guestListPage"
      />
      <h2 className='guestListHeader'>
        Guest List
      </h2>
      <div id="guestList">
        {event.guests.map(guest => (
          <GuestCard key={guest.id} guest={guest} eventId={eventId} />
        ))}
      </div>
    </div>
  );
};

export default GuestListPage;
