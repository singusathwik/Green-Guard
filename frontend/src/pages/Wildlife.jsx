import React from 'react';
import WildlifeSightingMap from '../components/Wildlifemap';
import { motion } from 'framer-motion';
import './Wildlife.css'; // 📂 Link your CSS

const WildlifeSightingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="wildlife-page"
    >
      <div className="wildlife-header">
        <div className="container">
          <h1 className="wildlife-title">Wildlife & Flora Sighting Map</h1>
          <p className="wildlife-subtitle">
            Log sightings of plants, animals, or ecological threats with geotagged photos. Help monitor biodiversity and identify environmental issues in your area.
          </p>
        </div>
      </div>

      <div className="container wildlife-content">
        <div className="map-container">
          <WildlifeSightingMap />
        </div>

        <div className="info-grid">
          {/* Box 1 */}
          <div className="info-box">
            <h3 className="info-title">Recent Sightings</h3>
            <p className="info-desc">View the latest wildlife and flora sightings from community members in your area.</p>
            <button className="info-button">View All Sightings</button>
          </div>

          {/* Box 2 */}
          <div className="info-box">
            <h3 className="info-title">Species Database</h3>
            <p className="info-desc">Explore our comprehensive database of local plant and animal species for identification.</p>
            <button className="info-button">Browse Database</button>
          </div>

          {/* Box 3 */}
          <div className="info-box">
            <h3 className="info-title">Reporting Guidelines</h3>
            <p className="info-desc">Learn how to properly document and report wildlife sightings for scientific accuracy.</p>
            <button className="info-button">Read Guidelines</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WildlifeSightingPage;
