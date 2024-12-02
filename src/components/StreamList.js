import React, { useState, useEffect } from 'react';
import '../styles/StreamList.css';  // Correct path to the CSS file in the styles folder

function StreamList() {
  // State to hold the list of events
  const [events, setEvents] = useState([]);

  // States to hold the new movie details
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents)); // Parse and set the events list
    }
  }, []); // Empty dependency array to run this effect only once

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events)); // Save events as a JSON string
    }
  }, [events]); // Run this effect whenever `events` state changes

  // Function to add a new event (movie or show)
  const addEvent = () => {
    if (!newTitle || !newDescription) {
      alert('Please enter both a title and a description.');
      return;
    }

    const newEvent = {
      id: events.length + 1, // Simple ID generation based on the length
      title: newTitle,
      description: newDescription,
      completed: false,
    };

    setEvents([...events, newEvent]); // Add the new event to the events list
    setNewTitle(''); // Clear the title input
    setNewDescription(''); // Clear the description input
  };

  // Function to mark an event as completed
  const completeEvent = (id) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, completed: true } : event
    ));
  };

  // Function to delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Function to edit an event
  const editEvent = (id, updatedTitle, updatedDescription) => {
    setEvents(events.map(event =>
      event.id === id
        ? { ...event, title: updatedTitle, description: updatedDescription }
        : event
    ));
  };

  return (
    <div className="stream-list">
      <h1>Your StreamList</h1>

      {/* Form for adding a new movie or show */}
      <div className="add-event-form">
        <input
          type="text"
          placeholder="Enter a movie or TV show"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addEvent}>Add to List</button>
      </div>

      {/* Display the list of events */}
      <h2>My Streaming List:</h2>
      {events.length === 0 ? (
        <p>Your list is currently empty.</p>
      ) : (
        <div>
          {events.map(event => (
            <div key={event.id} className={`event ${event.completed ? 'completed' : ''}`}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="button-container">
                <button className="edit-button" onClick={() => {
                  const updatedTitle = prompt("Enter new title:", event.title);
                  const updatedDescription = prompt("Enter new description:", event.description);
                  if (updatedTitle && updatedDescription) {
                    editEvent(event.id, updatedTitle, updatedDescription);
                  }
                }}>
                  Edit
                </button>
                <button className="complete-button" onClick={() => completeEvent(event.id)}>
                  {event.completed ? 'Completed' : 'Complete'}
                </button>
                <button className="delete-button" onClick={() => deleteEvent(event.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StreamList;

