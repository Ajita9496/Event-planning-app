
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventListPage from './components/event-list/EventListPage';
import "./App.css"
import GuestListPage from './components/guest-list/GuestListPage';
import Navbar from './components/navbar/Navbar';

function App() {
  
  return (
    <Router>
       <Navbar/>
      <Routes>
        <Route path="/" element={<EventListPage/>} />
        <Route path="/event-guests/:eventId" element={<GuestListPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
    