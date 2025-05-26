import React, { useState, useEffect } from 'react';
import { message, Modal, Input, Button, DatePicker } from 'antd';
import { Clock, MapPin, User, Plus } from 'lucide-react';
import moment from 'moment';
import './ConservationActivitiesPage.css';

const ConservationActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: null,
  });

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const response = await fetch('http://localhost:5000/api/conservation-activities', {
        headers: {
          Authorization: `Bearer ${token}`
        },
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

  useEffect(() => {
    fetchActivities();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) throw new Error('User information not found');
      const response = await fetch('http://localhost:5000/api/conservation-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date ? formData.date.toISOString() : new Date(),
          organizer: user._id, // Use the user's ID
        }),
      });
      const data = await response.json();
      if (data.success) {
        message.success('Activity created successfully');
        setIsModalVisible(false);
        setFormData({
          title: '',
          description: '',
          location: '',
          date: null,
        });
        fetchActivities();
      } else {
        message.error(`Failed to create activity: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Create activity error:', error);
      message.error('Error creating activity: ' + error.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({
      title: '',
      description: '',
      location: '',
      date: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  return (
    <>
      <div className="activities-wrapper">
        <div className="activities-header">
          <h1>Current Activities</h1>
          <Button
            type="primary"
            onClick={showModal}
            icon={<Plus size={16} />}
          >
            Create Activity
          </Button>
        </div>
        <div className="intro-message">
          <p>Join or create events to protect our ecosystems. Report and participate in conservation efforts today!</p>
        </div>
        <div className="activities-list">
          {loading ? (
            <p>Loading activities...</p>
          ) : activities.length === 0 ? (
            <p>No activities to display.</p>
          ) : (
            activities.map(activity => (
              <div key={activity._id} className="activity-card">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p>
                  <Clock size={16} style={{ marginRight: 5 }} />
                  {moment(activity.date).format('MMMM D, YYYY')}
                </p>
                <p>
                  <MapPin size={16} style={{ marginRight: 5 }} />
                  {activity.location}
                </p>
                <p>
                  <User size={16} style={{ marginRight: 5 }} />
                  {activity.organizer?.username || 'Unknown'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        title="Create New Activity"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          style={{ marginBottom: 16 }}
        />
        <DatePicker
          style={{ width: '100%', marginBottom: 16 }}
          onChange={handleDateChange}
          value={formData.date}
        />
        {/* No organizer input field */}
      </Modal>
    </>
  );
};

export default ConservationActivitiesPage;
