import React, { useState, useEffect } from 'react';
import { message, Modal, Input, Button, DatePicker } from 'antd';
import { Clock, MapPin, User, Plus } from 'lucide-react';
import moment from 'moment';
import './ConservationActivitiesPage.css'; // Unchanged CSS import

const ConservationActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: null,
    organizer: '',
    resourcesNeeded: [], // Added to match schema
  });

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        const response = await fetch('http://localhost:5000/api/conservation-activities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) setActivities(data.data);
        else message.error(`Failed to fetch activities: ${data.message || 'Unknown error'}`);
      } catch (error) {
        console.error('Fetch error:', error);
        message.error('Error fetching activities. Check login or connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log('Submitting activity data:', formData); // Debug log
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const response = await fetch('http://localhost:5000/api/conservation-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date ? formData.date.toISOString() : new Date(),
          // Ensure resourcesNeeded is an array, even if empty
          resourcesNeeded: formData.resourcesNeeded || [],
        }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (data.success) {
        message.success('Activity created successfully');
        setActivities(prevActivities => [...prevActivities, data.data]);
        setIsModalVisible(false);
        setFormData({
          title: '',
          description: '',
          location: '',
          date: null,
          organizer: '',
          resourcesNeeded: [], // Reset resourcesNeeded
        });
        message.info(`Activity saved to database with ID: ${data.data._id}`);
      } else {
        message.error(`Failed to create activity: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Create activity error:', error);
      message.error('Error creating activity: ' + error.message);
    }
  };

  const handleCancel = () => {
    console.log('Modal cancelled');
    setIsModalVisible(false);
    setFormData({
      title: '',
      description: '',
      location: '',
      date: null,
      organizer: '',
      resourcesNeeded: [], // Reset resourcesNeeded
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData(prev => ({ ...prev, date: date || null }));
  };

  // Handle resourcesNeeded input (simple text input for now)
  const handleResourcesChange = (e) => {
    const resources = e.target.value.split(',').map(r => r.trim()).filter(r => r); // Split by comma
    setFormData(prev => ({ ...prev, resourcesNeeded: resources }));
  };

  return (
    <div>
      <div className="conservation-header">
        <h1>Conservation Activities</h1>
        <p>Join or create events to protect our ecosystems. Report and participate in conservation efforts today!</p>
      </div>
      <div className="conservation-content">
        <div className="activities-header">
          <h2>Current Activities</h2>
          <Button type="primary" icon={<Plus />} onClick={showModal}>
            Create Activity
          </Button>
        </div>
        {loading ? (
          <p>Loading activities...</p>
        ) : activities.length === 0 ? (
          <p>No activities to display.</p>
        ) : (
          <div className="activities-list">
            {activities.map(activity => (
              <div key={activity._id} className="activity-card">
                <h3>{activity.title}</h3>
                <p><Clock size={14} /> {new Date(activity.date).toLocaleString()}</p>
                <p><MapPin size={14} /> {activity.location}</p>
                <p><User size={14} /> Organized by: {activity.organizer}</p>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
        )}
        <Modal
          title="Create New Activity"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Submit"
          cancelText="Cancel"
        >
          <Input
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <DatePicker
            placeholder="Date"
            value={formData.date ? moment(formData.date) : null}
            onChange={handleDateChange}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <Input
            placeholder="Organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Resources Needed (comma-separated, e.g., gloves, water)"
            value={formData.resourcesNeeded.join(', ')}
            onChange={handleResourcesChange}
            style={{ marginBottom: '10px' }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ConservationActivitiesPage;