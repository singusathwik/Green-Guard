import React, { useState } from 'react';
import { Book, Video, FileText, Download, Search, Filter, ExternalLink, ThumbsUp, Eye, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const EduResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const resources = [
    { id: 1, title: 'Biodiversity Conservation', type: 'Article', description: 'Learn about biodiversity.', difficulty: 'Beginner', views: 500, likes: 100, thumbnail: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg', author: 'Sarah', date: '2025-04-01', url: '#' },
    { id: 2, title: 'Climate Change Impacts', type: 'Video', description: 'Impact of climate change.', difficulty: 'Intermediate', views: 700, likes: 150, thumbnail: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg', author: 'John', date: '2025-04-05', url: '#' }
  ];

  const filteredResources = resources.filter(res =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === 'all' || res.type === selectedType) &&
    (selectedDifficulty === 'all' || res.difficulty === selectedDifficulty)
  );

  console.log('Filtered Resources:', filteredResources); // Debug log

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Educational Resources</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search resources..." style={{ flex: 1, padding: '8px' }} />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ padding: '8px' }}>
          <option value="all">All Types</option>
          <option value="Article">Article</option>
          <option value="Video">Video</option>
        </select>
        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} style={{ padding: '8px' }}>
          <option value="all">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredResources.map(resource => (
          <div key={resource.id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={resource.thumbnail} alt={resource.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '10px' }}>
              <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{resource.title}</h3>
              <p style={{ fontSize: '14px', color: '#555' }}>{resource.description}</p>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#777' }}>
                <p>By {resource.author}</p>
                <p>{new Date(resource.date).toLocaleDateString()}</p>
              </div>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span><Eye size={14} /> {resource.views}</span>
                <span><ThumbsUp size={14} /> {resource.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EduResources;