import React, { useState, useEffect } from 'react';
import EventForm from '../event-form/EventForm';
import EventCard from '../event-card/EventCard';
import "./eventListPage.css"

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadEvents(); 
  }, []);

  const loadEvents = () => {
    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(eventData);
  };

  const handleShowEventForm = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleCloseEventForm = () => {
    setSelectedEvent(null);
    setShowEventForm(false);
    loadEvents();
  };

  return (
    <div className='eventListContainer'>
      <div className='eventListHeader'>
        <h1>EVENTS LIST</h1>
        <button className="createEventButton" onClick={() => handleShowEventForm(null)}>Create Event</button>
      </div>
      
      {showEventForm && (
        <EventForm
          onClose={handleCloseEventForm}
          initialEvent={selectedEvent || {}}
        />
      )}

      <div id="eventsList">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            showViewGuestsButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default EventListPage;
