import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            messageApi.open({
                type: 'error',
                content: 'Please fill in all fields',
            });
            return;
        }
        onLogin({ username, password }, messageApi);
    };

    return (
        <div className="login-wrapper">
            {contextHolder}
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                    <div className="toggle-auth">
                        Don't have an account? <Link to="/signup"><span>Sign up</span></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;