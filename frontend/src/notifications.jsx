import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import './notifications.css';

const Notifications = ({ user }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                console.log('Fetching notifications for user:', user._id);
                const response = await fetch(`http://localhost:5000/api/notifications?userId=${user._id}`);
                const data = await response.json();
                console.log('Notifications data:', data);
                if (data.success) {
                    setNotifications(data.data);
                } else {
                    setError(data.message || 'Failed to fetch notifications');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(`Error fetching notifications: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        if (user?._id) {
            fetchNotifications();
        }
    }, [user]);

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (data.success) {
                setNotifications(notifications.map(n =>
                    n._id === notificationId ? { ...n, isRead: true } : n
                ));
                messageApi.success('Notification marked as read');
            } else {
                messageApi.error(data.message || 'Failed to mark as read');
            }
        } catch (err) {
            messageApi.error('Error marking notification as read');
        }
    };

    const updateLikeStatus = async (notificationId, likeStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}/like`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ likeStatus }),
            });
            const data = await response.json();
            if (data.success) {
                setNotifications(notifications.map(n =>
                    n._id === notificationId ? { ...n, likeStatus } : n
                ));
                messageApi.success(`Notification ${likeStatus === 'like' ? 'liked' : likeStatus === 'dislike' ? 'disliked' : 'reset'}`);
            } else {
                messageApi.error(data.message || 'Failed to update like status');
            }
        } catch (err) {
            messageApi.error('Error updating like status');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="notifications">
            {contextHolder}
            <h2>Notifications</h2>
            <p>Stay updated with the latest alerts and updates.</p>
            <div className="notification-list">
                {notifications.length === 0 ? (
                    <p>No notifications available.</p>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
                        >
                            <div className="notification-content">
                                <h3>{notification.message}</h3>
                                <p><strong>Type:</strong> {notification.type}</p>
                                <p><strong>Status:</strong> {notification.isRead ? 'Read' : 'Unread'}</p>
                                <p><strong>Like Status:</strong> {notification.likeStatus}</p>
                                <p><strong>Date:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="notification-actions">
                                {!notification.isRead && (
                                    <button
                                        className="action-button read-button"
                                        onClick={() => markAsRead(notification._id)}
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <button
                                    className={`action-button ${notification.likeStatus === 'like' ? 'active' : ''}`}
                                    onClick={() => updateLikeStatus(notification._id, notification.likeStatus === 'like' ? 'none' : 'like')}
                                >
                                    {notification.likeStatus === 'like' ? 'Unlike' : 'Like'}
                                </button>
                                <button
                                    className={`action-button ${notification.likeStatus === 'dislike' ? 'active' : ''}`}
                                    onClick={() => updateLikeStatus(notification._id, notification.likeStatus === 'dislike' ? 'none' : 'dislike')}
                                >
                                    {notification.likeStatus === 'dislike' ? 'Undislike' : 'Dislike'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;