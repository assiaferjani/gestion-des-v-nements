import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EventComponent = () => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    imageUrl: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token manquant');
        return;
      }

      // Combiner la date et l'heure en utilisant template literals corrects
      const eventDateTime = `${newEvent.date}T${newEvent.time}:00`;

      const eventData = {
        title: newEvent.title,
        date: eventDateTime,
        location: newEvent.location,
        category: newEvent.category,
        imageUrl: newEvent.imageUrl
      };

      await axios.post('/api/events', eventData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      
      navigate('/events');

    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de l\'événement');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <form onSubmit={handleAddEvent} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un événement</h2>

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input 
            type="text" 
            id="title" 
            value={newEvent.title} 
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            id="date" 
            value={newEvent.date} 
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
          <input 
            type="time" 
            id="time" 
            value={newEvent.time} 
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu</label>
          <input 
            type="text" 
            id="location" 
            value={newEvent.location} 
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
          <input 
            type="text" 
            id="category" 
            value={newEvent.category} 
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de l'image</label>
          <input 
            type="url" 
            id="imageUrl"
            value={newEvent.imageUrl}
            onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="https://exemple.com/image.jpg"
          />
          {newEvent.imageUrl && (
            <div className="mt-4">
              <img 
                src={newEvent.imageUrl} 
                alt="Aperçu de l'image" 
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => e.target.src = "/placeholder-event.jpg"}
              />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Ajouter l'événement
        </button>

        <button 
          type="button"
          onClick={() => navigate('/events')}
          className="mt-4 w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Annuler
        </button>
      </form>
    </div>
  );
};

export default EventComponent;