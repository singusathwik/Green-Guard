import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Camera, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './WildlifeMap.css';
const customIcon = new L.Icon({
    iconUrl: 'https://www.flaticon.com/free-icons/map-pin', // your image URL here
    iconSize: [35, 35],         // width and height
    iconAnchor: [17, 34],       // point of the icon which will correspond to marker location
    popupAnchor: [0, -34],      // point from which the popup should open relative to the iconAnchor
  });
  

const SAMPLE_SIGHTINGS = [
  {
    id: '1',
    type: 'fauna',
    species: 'Red Fox',
    description: 'Healthy adult spotted near the creek',
    image: 'https://images.pexels.com/photos/247399/pexels-photo-247399.jpeg',
    coordinates: [37.7749, -122.4194],
    date: '2025-05-15',
    reporter: 'Jane Doe'
  },
  {
    id: '2',
    type: 'flora',
    species: 'Coastal Redwood',
    description: 'Old growth specimen, approximately 80ft tall',
    image: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg',
    coordinates: [37.7649, -122.4294],
    date: '2025-05-10',
    reporter: 'John Smith'
  },
  {
    id: '3',
    type: 'threat',
    species: 'Illegal Dumping',
    description: 'Construction waste dumped near protected wetland',
    image: 'https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg',
    coordinates: [37.7849, -122.4094],
    date: '2025-05-12',
    reporter: 'Park Ranger'
  }
];

const WildlifeSightingMap = () => {
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

  const toggleAddingMode = () => {
    setIsAddingMode(!isAddingMode);
    if (selectedSighting) setSelectedSighting(null);
  };

  return (
    <div className="wildlife-map-wrapper">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={11}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {SAMPLE_SIGHTINGS.map((sighting) => (
          <Marker
            key={sighting.id}
            position={sighting.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setSelectedSighting(sighting);
              }
            }}
          />
        ))}

        {selectedSighting && (
          <Popup
            position={selectedSighting.coordinates}
            onClose={() => setSelectedSighting(null)}
          >
            <div className="popup-content">
              <div className="popup-image">
                <img src={selectedSighting.image} alt={selectedSighting.species} />
                <div className={`popup-type ${selectedSighting.type}`}>
                  {selectedSighting.type}
                </div>
              </div>
              <h3>{selectedSighting.species}</h3>
              <p>{selectedSighting.description}</p>
              <small>
                Reported: {selectedSighting.date} | By: {selectedSighting.reporter}
              </small>
            </div>
          </Popup>
        )}
      </MapContainer>

      {/* Floating buttons */}
      <div className="map-controls">
        <button
          className={`toggle-add ${isAddingMode ? 'active' : ''}`}
          onClick={toggleAddingMode}
        >
          {isAddingMode ? <X size={20} /> : <Camera size={20} />}
        </button>
      </div>

      {/* Form for adding new sighting */}
      {isAddingMode && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="add-sighting-form"
        >
          <div className="form-header">
            <h3>Report New Sighting</h3>
            <button onClick={toggleAddingMode}>
              <X size={20} />
            </button>
          </div>

          <form>
            <label>Type</label>
            <div className="radio-group">
              {['Flora', 'Fauna', 'Threat'].map((type) => (
                <label key={type}>
                  <input type="radio" name="type" value={type.toLowerCase()} /> {type}
                </label>
              ))}
            </div>

            <label>Species/Name</label>
            <input type="text" placeholder="e.g., Oak Tree, Deer, Erosion" />

            <label>Description</label>
            <textarea placeholder="Provide details about what you observed" />

            <label>Photo</label>
            <input type="file" />

            <button type="submit" className="submit-button">
              <Send size={16} /> Submit Sighting
            </button>
          </form>
        </motion.div>
      )}

      {/* Map Legend */}
      <div className="map-legend">
        <h4>Legend</h4>
        <div className="legend-item">
          <div className="marker flora"></div> Flora
        </div>
        <div className="legend-item">
          <div className="marker fauna"></div> Fauna
        </div>
        <div className="legend-item">
          <div className="marker threat"></div> Threat
        </div>
      </div>
    </div>
  );
};

export default WildlifeSightingMap;
