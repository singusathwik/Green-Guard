import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import EduResources from './EduResources';
import Notifications from './notifications';
import WildlifeSightingPage from './pages/Wildlife';
import Footer from './Footer';
import TreeTrackerPage from './pages/Treetrackerpage';
import ThreatAlertPage from './pages/ThreatPage';
import ResourcesPage from './pages/ResourcesPage';
import LeaderboardPage from './pages/LeaderBoardPage';
import ConservationActivitiesPage from './pages/ConservationActivitiesPage';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authenticatedRoutes = [
      '/dashboard',
      '/dashboard/resources',
      '/dashboard/notifications',
      '/dashboard/trees',
      '/dashboard/wildlife',
      '/dashboard/threats',
      '/dashboard/events',
      '/dashboard/leaderboard',
    ];

    const publicRoutes = ['/login', '/signup', '/'];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(JSON.parse(localStorage.getItem('user')));
          if (!authenticatedRoutes.includes(location.pathname)) {
            navigate('/dashboard');
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  const handleLogin = async (credentials) => {
    try {
      messageApi.open({
        type: 'loading',
        content: 'Logging in...',
        duration: 0,
        key: 'login',
      });

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      messageApi.destroy('login');

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        console.log('Showing welcome message for:', data.user.username);
        messageApi.open({
          type: 'success',
          content: `Welcome, ${data.user.username}!`,
          duration: 3,
        });
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        messageApi.open({
          type: 'error',
          content: data.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      messageApi.destroy('login');
      console.error('Login error:', error);
      messageApi.open({
        type: 'error',
        content: 'Login failed. Please try again.',
      });
    }
  };

  const handleSignup = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        messageApi.open({
          type: 'success',
          content: 'User created successfully! Please log in.',
        });
        navigate('/login');
      } else {
        messageApi.open({
          type: 'error',
          content: data.message || 'Signup failed',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      messageApi.open({
        type: 'error',
        content: 'Signup failed. Please try again.',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      {contextHolder}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <HomePage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/resources"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <EduResources />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/notifications"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <Notifications user={user} />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/trees"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <TreeTrackerPage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/wildlife"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <WildlifeSightingPage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/leaderboard"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <LeaderboardPage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/threats"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <ThreatAlertPage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/events"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <ConservationActivitiesPage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard/resources"
              element={
                isAuthenticated ? (
                  <div className="app">
                    <Sidebar />
                    <div style={{ marginLeft: '70px' }}>
                      <Navbar onLogout={handleLogout} user={user} />
                      <ResourcesPage />
                    </div>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          </Routes>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;