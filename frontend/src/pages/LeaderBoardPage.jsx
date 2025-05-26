import React from 'react';
import BiodiversityLeaderboard from '../components/BiodiversityLeaderboard';
import { motion } from 'framer-motion';

const LeaderboardPage = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px' }}>
      <style>
        {`
          .leaderboard-header {
            background:  #065f46;
            padding: 60px 20px;
            color: white;
            margin-bottom: 40px;
            padding-left: 100px;
            margin-top: 6px;
            font-family: 'Poppins', sans-serif;

          }
          .leaderboard-header h1 {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .leaderboard-header p {
            max-width: 700px;
            font-size: 16px;
          }
          .leaderboard-content {
            padding: 0 20px 40px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
        `}
      </style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header Section */}
        <div className="leaderboard-header">
          <h1>Biodiversity Leaderboard</h1>
          <p>
            A gamified leaderboard to encourage and recognize active contributors to conservation efforts, including students, schools, and local organizations.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="leaderboard-content">
          <BiodiversityLeaderboard />
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;
