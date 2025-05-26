import React, { useState } from 'react';
import { Trophy, Users, Search, Camera, Leaf, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const SAMPLE_LEADERBOARD = [
  {
    id: '1',
    name: 'EcoWarriors High School',
    avatar: 'https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg',
    points: 3750,
    contributions: { sightings: 87, trees: 120, cleanups: 15, alerts: 12 },
    badges: ['Tree Champion', 'Wildlife Spotter', 'Habitat Protector'],
    rank: 1,
    type: 'School',
    region: 'Northern District'
  },
  {
    id: '2',
    name: 'Green Guardians',
    avatar: 'https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg',
    points: 3450,
    contributions: { sightings: 105, trees: 95, cleanups: 12, alerts: 8 },
    badges: ['Coastal Protector', 'Bird Watcher', 'Community Leader'],
    rank: 2,
    type: 'Organization',
    region: 'Western Shores'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg',
    points: 2875,
    contributions: { sightings: 124, trees: 45, cleanups: 8, alerts: 15 },
    badges: ['Wildlife Enthusiast', 'Urban Naturalist', 'Research Contributor'],
    rank: 3,
    type: 'Individual',
    region: 'Central Metro'
  }
];

const BiodiversityLeaderboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeaderboard = SAMPLE_LEADERBOARD.filter(entry => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title"><Trophy size={24} /> Biodiversity Champions</h2>
      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search participants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="podium">
        {filteredLeaderboard.map((entry, index) => (
          <div className={`podium-card ${index === 0 ? 'first' : ''}`} key={entry.id}>
            <img src={entry.avatar} alt={entry.name} className="avatar" />
            <h3>{entry.name}</h3>
            <p>{entry.points} pts</p>
          </div>
        ))}
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Region</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaderboard.map((entry, idx) => (
            <tr key={entry.id}>
              <td>{idx + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.region}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .leaderboard-container {
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .leaderboard-title {
          font-size: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-bar input {
          padding: 5px 10px;
          flex: 1;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .podium {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 30px;
        }
        .podium-card {
          text-align: center;
        }
        .podium-card.first {
          transform: scale(1.1);
        }
        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 10px;
        }
        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
        }
        .leaderboard-table th, .leaderboard-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .leaderboard-table th {
          background: #f7f7f7;
        }
      `}</style>
    </div>
  );
};

export default BiodiversityLeaderboard;
