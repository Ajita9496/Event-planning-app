import React, { useState, useEffect } from 'react';
import EventForm from '../event-form/EventForm';
import EventCard from '../event-card/EventCard';
import "./eventListPage.css"

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEvents(); 
  }, []);

  const loadEvents = () => {
    const eventData = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(eventData);
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      loadEvents();
    } else {
      filteritem(term);
    }
  };
  
  const handleShowEventForm = () => {
    setShowEventForm(true);
  };

  const handleCloseEventForm = () => {
    setShowEventForm(false);
    loadEvents();
  };

const filteritem = (searchTerm) => {
  const eventArray = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setEvents(eventArray);
};

  return (
    <div className='eventListContainer'>
      <div className='eventListHeader'>
        <h1>EVENTS LIST</h1>
        <div className='searchContainer'>
          <label htmlFor='search'>Search Events</label>
          <input
          type="text"
          value={searchTerm}
          placeholder='Event Name'
          onChange={handleSearchChange}
           />
          
        </div>
        <button className="createEventButton" onClick={() => handleShowEventForm()}>Create Event</button>
      </div>
      
      {showEventForm && (
        <EventForm
          onClose={handleCloseEventForm}
          initialEvent={{}}
        
        />
      )}

      <div id="eventsList">
        {events.map((event) => (
          
          <EventCard
            key={event.id}
            event={event}
            showViewGuestsButton={true}
            loadEvents = {loadEvents}
          />
        ))}
      </div>
    </div>
  );
};

export default EventListPage;
