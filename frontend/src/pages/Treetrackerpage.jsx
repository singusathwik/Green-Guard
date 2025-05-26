import React, { useState, useEffect } from 'react';
import { message, Modal, Input, Button, Select, DatePicker } from 'antd';
import { Plus } from 'lucide-react';
import moment from 'moment';
import './Treetrackerpage.css';
import TreeTracker from '../components/Treetracker'; // Ensure correct path

const TreeTrackerPage = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    species: '',
    location: '', // Changed to string
    plantedBy: '', // Will be set to user._id from token
    healthUpdates: [{ date: null, height: '', canopySize: '', healthStatus: '' }],
  });

  useEffect(() => {
    const fetchTrees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching trees, token exists:', !!token);
        if (!token) throw new Error('No authentication token found');
        const response = await fetch('http://localhost:5000/api/trees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetch response status:', response.status);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Fetch data:', data);
        if (data.success) setTrees(data.data || []);
        else message.error(`Failed to fetch trees: ${data.message || 'Unknown error'}`);
      } catch (error) {
        console.error('Fetch error:', error);
        message.error('Error fetching trees. Check login or connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrees();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!formData.species || !formData.location || !user?._id) {
        message.error('Species, location, and plantedBy are required.');
        return;
      }

      console.log('Submitting form data:', formData);
      const response = await fetch('http://localhost:5000/api/trees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          plantedBy: user._id,
          healthUpdates: formData.healthUpdates.map(update => ({
            ...update,
            date: update.date ? update.date.toISOString() : new Date(),
            height: update.height ? parseFloat(update.height) : undefined,
            canopySize: update.canopySize ? parseFloat(update.canopySize) : undefined,
          })),
        }),
      });
      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        message.success('Tree added successfully');
        setTrees(prevTrees => [...prevTrees, data.data]);
        setIsModalVisible(false);
        setFormData({
          species: '',
          location: '',
          plantedBy: '',
          healthUpdates: [{ date: null, height: '', canopySize: '', healthStatus: '' }],
        });
      } else {
        message.error(`Failed to add tree: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Add tree error:', error);
      message.error('Error adding tree: ' + error.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({
      species: '',
      location: '',
      plantedBy: '',
      healthUpdates: [{ date: null, height: '', canopySize: '', healthStatus: '' }],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('healthUpdates')) {
      const [_, index, field] = name.split('.');
      const newHealthUpdates = [...formData.healthUpdates];
      newHealthUpdates[parseInt(index)][field] = value;
      setFormData(prev => ({ ...prev, healthUpdates: newHealthUpdates }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (index, date) => {
    const newHealthUpdates = [...formData.healthUpdates];
    newHealthUpdates[index].date = date ? moment(date) : null;
    setFormData(prev => ({ ...prev, healthUpdates: newHealthUpdates }));
  };

  return (
    <div className="tree-tracker-page">
      <section className="tree-hero-section">
        <div className="tree-title">Tree Tracker</div>
        <div className="tree-subtitle">
          Track every tree planted by the community. Filter by species or planter.
        </div>
      </section>
      <main className="tree-main-content">
        <div className="tree-tracker-wrapper">
          {loading ? (
            <p>Loading trees...</p>
          ) : trees.length === 0 ? (
            <p>No trees to display.</p>
          ) : (
            <TreeTracker trees={trees} />
          )}
          <Button type="primary" icon={<Plus />} onClick={showModal} style={{ marginTop: '20px' }}>
            Add Tree
          </Button>
        </div>
        <Modal
          title="Add New Tree"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Submit"
          cancelText="Cancel"
        >
          <Input
            placeholder="Species"
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Location (e.g., Memorial Park)"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <h4>Initial Health Update</h4>
          <DatePicker
            placeholder="Date"
            value={formData.healthUpdates[0].date}
            onChange={(date) => handleDateChange(0, date)}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <Input
            placeholder="Height (cm)"
            name="healthUpdates.0.height"
            value={formData.healthUpdates[0].height}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Canopy Size (cm)"
            name="healthUpdates.0.canopySize"
            value={formData.healthUpdates[0].canopySize}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Select
            placeholder="Health Status"
            value={formData.healthUpdates[0].healthStatus}
            onChange={(value) => handleInputChange({ target: { name: 'healthUpdates.0.healthStatus', value } })}
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <Select.Option value="healthy">Healthy</Select.Option>
            <Select.Option value="moderate">Moderate</Select.Option>
            <Select.Option value="poor">Poor</Select.Option>
          </Select>
        </Modal>
      </main>
    </div>
  );
};

export default TreeTrackerPage;