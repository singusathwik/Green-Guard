import React from 'react';
import EducationalResources from '../components/EducationalResources';
import { motion } from 'framer-motion';

const ResourcesPage = () => {
  return (
    <>
      {/* Internal CSS */}
      <style>{`
        .resources-wrapper {
          min-height: 100vh;
          padding-top: 4.4rem;
          background-color: #f5f5f5;
          font-family: 'Poppins', sans-serif;

        }
        .resources-header {
          background-color: #065f46;
          padding: 3rem 1rem;
          margin-bottom: 2rem;
          color: white;
        }
        .resources-header-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .resources-title {
          font-size: 2.5rem;
          font-family: 'Poppins', sans-serif;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .resources-description {
          max-width: 700px;
          color: #d1d5db;
          line-height: 1.6;
        }
        .resources-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem 4rem;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="resources-wrapper"
      >
        {/* Header Section */}
        <div className="resources-header">
          <div className="resources-header-container">
            <h1 className="resources-title">Educational Resources</h1>
            <p className="resources-description">
              Access curated guides, videos, and quizzes on biodiversity, conservation, and SDG 15 (Life on Land).
              Learn more about protecting our natural environment.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="resources-content">
          <div style={{ marginBottom: '2rem' }}>
            <EducationalResources />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ResourcesPage;
