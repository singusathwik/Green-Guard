import React, { useState } from 'react';

const ActivityForm = ({ onActivityCreated }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: '', // Set this to the logged-in user's ID in a real app
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (data.success) {
                setMessage('Activity created!');
                setForm({ title: '', description: '', date: '', location: '', organizer: '' });
                onActivityCreated();
            } else {
                setMessage(data.message || 'Failed to create activity.');
            }
        } catch (err) {
            setMessage('Error submitting activity.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Activity</h2>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            {/* Organizer field can be hidden or auto-filled for logged-in users */}
            <button type="submit">Submit</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default ActivityForm;
