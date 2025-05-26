import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Clock, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, Input, Select, Button, message } from 'antd';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
const { Option } = Select;
import './ThreatAlert.css';

const ThreatAlert = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [threats, setThreats] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedThreatId, setUpdatedThreatId] = useState(null);
  const [showParticles, setShowParticles] = useState(false);
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ type: '', description: '', location: '', coordinates: [], severity: '', reportedBy: '', image: '' });

  useEffect(() => {
    fetchThreats();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      shape: { type: 'image', image: { src: 'https://img.icons8.com/ios-filled/50/00cc99/leaf.png', width: 50, height: 50 } },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 2, opacity_min: 0, sync: false } },
      size: { value: 10, random: true, anim: { enable: true, speed: 10, size_min: 5, sync: false } },
      move: {
        enable: true,
        speed: 3,
        direction: 'top',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false },
      },
      rotate: { value: 0, random: true, direction: 'clockwise', animation: { enable: true, speed: 5, sync: false } },
    },
    interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true,
  };

  const fetchThreats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const response = await fetch('http://localhost:5000/api/threats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setThreats(data.data);
      else message.error(`Failed to fetch threats: ${data.message || 'Unknown error'}`);
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Error fetching threats. Check login or connection.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const triggerParticles = (e) => {
    setParticlePosition({ x: e.clientX, y: e.clientY });
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 2000); // Particles disappear after 2s
  };

  const handleResolve = async (threatId, e) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const response = await fetch(`http://localhost:5000/api/threats/${threatId}/resolve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        message.success('Threat marked as resolved');
        setUpdatedThreatId(threatId);
        triggerParticles(e); // Trigger particles
        setTimeout(() => setUpdatedThreatId(null), 1000);
        fetchThreats();
      } else {
        message.error(`Failed to resolve threat: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Resolve error:', error);
      message.error('Error resolving threat. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const filteredThreats = filter === 'all' ? threats : threats.filter(
    threat => filter === 'active' ? ['Pending', 'Investigating'].includes(threat.status) : threat.status === 'Resolved'
  );

  const showModal = () => {
    console.log('Modal opened');
    setIsModalVisible(true);
  };

  const handleOk = async (e) => {
    console.log('Submitting form data:', formData);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const response = await fetch('http://localhost:5000/api/threats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        message.success('Threat reported successfully');
        triggerParticles(e); // Trigger particles
        setIsModalVisible(false);
        setFormData({ type: '', description: '', location: '', coordinates: [], severity: '', reportedBy: '', image: '' });
        fetchThreats();
      } else {
        message.error(`Failed to report threat: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Report error:', error);
      message.error('Error reporting threat. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Modal cancelled');
    setIsModalVisible(false);
    setFormData({ type: '', description: '', location: '', coordinates: [], severity: '', reportedBy: '', image: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => setFormData(prev => ({ ...prev, severity: value }));

  const handleCoordinatesChange = (e) => {
    const value = e.target.value.split(',').map(num => parseFloat(num.trim()));
    setFormData(prev => ({ ...prev, coordinates: value }));
  };

  const cardVariants = {
    pulse: { scale: [1, 1.05, 1], transition: { duration: 0.5, times: [0, 0.5, 1] } },
    normal: { scale: 1 },
  };

  return (
    <div className="threat-wrapper" style={{ border: '2px solid #f94949', borderRadius: '8px', position: 'relative' }}>
      {loading && <div className="eco-spinner"></div>}
      {showParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}
        />
      )}
      <div className="threat-header">
        <h2><AlertTriangle size={20} /> Environmental Threat Alerts</h2>
        <div className="threat-actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginLeft: '10px', padding: '8px 12px', borderRadius: '8px' }}>
            <option value="all">All Alerts</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
          <motion.button
            className="btn-primary"
            onClick={showModal}
            style={{ marginLeft: '10px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Report Threat
          </motion.button>
        </div>
      </div>

      <motion.div className="threat-cards" layout>
        <AnimatePresence>
          {filteredThreats.map((threat, index) => (
            <motion.div
              key={threat._id}
              className="threat-card"
              style={{ border: '1px solid #eee', borderRadius: '8px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={updatedThreatId === threat._id ? 'pulse' : { opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              layout
            >
              <div className="threat-card-header" onClick={() => toggleExpand(threat._id)}>
                <div className="threat-card-info">
                  <AlertTriangle size={18} />
                  <div>
                    <h3>{threat.type}</h3>
                    <p><Clock size={12} /> {new Date(threat.reportedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="threat-card-status">
                  <span className={`status ${threat.status.toLowerCase()}`}>{threat.status}</span>
                  <span className={`severity ${threat.severity.toLowerCase()}`}>{threat.severity}</span>
                  {expandedId === threat._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              <AnimatePresence>
                {expandedId === threat._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="threat-card-body"
                  >
                    <div className="threat-card-details">
                      {threat.image && <img src={threat.image} alt="Threat" className="threat-image" />}
                      <div className="threat-desc">
                        <p><strong>Description:</strong> {threat.description}</p>
                        <p><strong>Location:</strong> <MapPin size={14} /> {threat.location}</p>
                        <p><strong>Reported By:</strong> <User size={14} /> {threat.reportedBy}</p>
                      </div>
                      <div className="threat-card-actions">
                        <motion.button
                          className="resolve-btn"
                          onClick={(e) => handleResolve(threat._id, e)}
                          disabled={threat.status === 'Resolved'}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Resolve
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal
        title="Report New Threat"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Input placeholder="Type" name="type" value={formData.type} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <Input placeholder="Description" name="description" value={formData.description} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <Input placeholder="Location" name="location" value={formData.location} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <Input placeholder="Coordinates (e.g., -122.4194,37.7749)" name="coordinates" value={formData.coordinates.join(',')} onChange={handleCoordinatesChange} style={{ marginBottom: '10px' }} />
          <Select placeholder="Severity" value={formData.severity} onChange={handleSelectChange} style={{ marginBottom: '10px', width: '100%' }}>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
            <Option value="Critical">Critical</Option>
          </Select>
          <Input placeholder="Reported By" name="reportedBy" value={formData.reportedBy} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
        </motion.div>
      </Modal>
    </div>
  );
};

export default ThreatAlert;