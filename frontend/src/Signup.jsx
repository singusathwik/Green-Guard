import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Use the same CSS as Login.jsx

const Signup = ({ onSignup }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.success) {
                messageApi.success('User created successfully! Please log in.');
                setTimeout(() => navigate('/login'), 1000); // Redirect to login after 1 second
            } else {
                messageApi.error(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            messageApi.error('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {contextHolder}
            <div className="auth-container">
                <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleSubmit({ username: e.target.username.value, email: e.target.email.value, password: e.target.password.value }); }}>
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Input.Password
                            name="password"
                            placeholder="Enter your password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        />
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading} className="auth-button">
                        Sign Up
                    </Button>
                    <div className="toggle-auth">
                        Already have an account? <Button type="link" onClick={() => navigate('/login')}><span>Log in</span></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;