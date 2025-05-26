import React from 'react';
import ThreatAlert from '../components/ThreatAlert';
import { motion } from 'framer-motion';
import './ThreatPage.css';

const ThreatAlertPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="threat-page-wrapper"
    >
      {/* Header Section */}
      <div className="threat-page-header">
        <div className="threat-header-content">
          <h1>Threat Alert System</h1>
          <p>
            Flag urgent threats like fires or illegal logging, which are sent to local authorities and NGOs for rapid response.
            Help protect your local ecosystems from harm.
          </p>
        </div>
      </div>

      {/* Main Threat Section */}
      <div className="threat-page-body">
        <div className="threat-content">
          <ThreatAlert />
        </div>
      </div>
    </motion.div>
  );
};

export default ThreatAlertPage;
