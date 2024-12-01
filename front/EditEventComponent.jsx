import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditEventComponent = () => {
  const { id } = useParams();//Extrait l'id de l'événement à partir de l'URL.
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    imageUrl: ''
  });
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        //Récupère le token d'authentification depuis le stockage local.
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token manquant');
          return;
        }
        //const response = await axios.get(`/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const response = await axios.get(`/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
  
        const eventData = response.data;
        //Convertit la date de l'événement en objet Date.
        const eventDate = new Date(eventData.date);
  
        setEvent({
          title: eventData.title,
          date: eventDate.toISOString().split('T')[0],
          time: eventDate.toTimeString().slice(0, 5),
          location: eventData.location,
          category: eventData.category,
          imageUrl: eventData.imageUrl
        });
      } catch (err) {
        setError('Erreur lors du chargement de l\'événement');
      }
    };
  
    fetchEvent();
  }, [id]);
  //Exécute cet effet à chaque fois que l'id change.
  
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token manquant');
        return;
      }
  
      const eventDateTime = `${event.date}T${event.time}:00`;
  
      const eventData = {
        title: event.title,
        date: eventDateTime,
        location: event.location,
        category: event.category,
        imageUrl: event.imageUrl
      };
  
      await axios.put(`/api/events/${id}`, eventData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      alert('Événement mis à jour avec succès !');
      navigate('/');
  
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour de l\'événement');
      console.error("Erreur lors de la mise à jour :", err.response || err);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <form onSubmit={handleUpdateEvent} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Modifier l'événement</h2>

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
            value={event.title} 
            onChange={(e) => setEvent({ ...event, title: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            id="date" 
            value={event.date} 
            onChange={(e) => setEvent({ ...event, date: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
          <input 
            type="time" 
            id="time" 
            value={event.time} 
            onChange={(e) => setEvent({ ...event, time: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu</label>
          <input 
            type="text" 
            id="location" 
            value={event.location} 
            onChange={(e) => setEvent({ ...event, location: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
          <input 
            type="text" 
            id="category" 
            value={event.category} 
            onChange={(e) => setEvent({ ...event, category: e.target.value })} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de l'image</label>
          <input 
            type="url" 
            id="imageUrl"
            value={event.imageUrl}
            onChange={(e) => setEvent({ ...event, imageUrl: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="https://exemple.com/image.jpg"
          />
          {event.imageUrl && (
            <div className="mt-4">
              <img 
                src={event.imageUrl} 
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
          Mettre à jour l'événement
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

export default EditEventComponent;