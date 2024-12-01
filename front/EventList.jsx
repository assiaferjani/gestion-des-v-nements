import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendar, FaMapMarkerAlt, FaTag, FaEdit, FaTrash } from 'react-icons/fa';
import { Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token manquant');
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/events/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialiser la liste filtrée
      } else {
        setError('Aucun événement trouvé');
      }

      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des événements');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = () => {
    const results = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    try {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?');
      if (!confirmation) return;

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token manquant');
        return;
      }

      await axios.delete(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Événement supprimé avec succès');
      fetchEvents();
    } catch (err) {
      setError('Erreur lors de la suppression de l\'événement');
    }
  };

  const handleParticipate = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token manquant');
        return;
      }

      await axios.post(`/api/events/${eventId}/register`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Vous êtes inscrit à cet événement');
      fetchEvents();
    } catch (err) {
      setError('Erreur lors de l\'inscription à l\'événement');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Liste des Événements</h1>

      {/* Barre de recherche avec un bouton */}
      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Rechercher un événement par titre"
          className="w-3/4 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Rechercher
        </button>
      </div>

      <div className="text-center mb-6">
        <button
          className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => navigate('/add-event')}
        >
          Ajouter un événement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.imageUrl || "/placeholder-event.jpg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "/placeholder-event.jpg"}
                />
              </div>
              <div className="p-5">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-4">
                  {event.title}
                </h5>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <FaCalendar className="mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaTag className="mr-2" />
                    <span>{event.category}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
                  >
                    <FaTrash className="mr-2" /> Supprimer
                  </button>
                  <button
                    onClick={() => handleParticipate(event.id)}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  >
                    Participer
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Aucun événement disponible pour le moment
        </div>
      )}
    </div>
  );
};

export default EventList;