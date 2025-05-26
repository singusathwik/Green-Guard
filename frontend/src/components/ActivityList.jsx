import React, { useEffect, useState } from 'react';

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/activities');
            const data = await response.json();
            if (data.success) {
                setActivities(data.data);
            }
        } catch (err) {
            // Handle error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    if (loading) return <div>Loading activities...</div>;

    return (
        <div>
            <h2>Upcoming Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <strong>{activity.title}</strong> — {activity.description} <br />
                        Date: {new Date(activity.date).toLocaleDateString()} <br />
                        Location: {activity.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityList;
