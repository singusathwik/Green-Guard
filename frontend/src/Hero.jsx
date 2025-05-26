import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Leaf, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';  // 👈 import normal css

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = document.querySelector('.hero-parallax');
      if (heroElement) {
        heroElement.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hero-wrapper">

      <div
        className="hero-parallax"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-text"
        >
          <h1>
            Protecting Our Planet,<br />
            <span>One Community at a Time</span>
          </h1>

          <p>
            Join our global network of environmental stewards helping to monitor, protect, and restore local ecosystems through collaborative conservation efforts.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard/wildlife" className="btn-primary">
              Start Exploring <ArrowRight size={20} />
            </Link>
            <Link to="/dashboard/trees" className="btn-secondary">
              Join an Activity
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-features"
        >
          <div className="feature-card">
            <MapPin size={40} />
            <h3>Wildlife Mapping</h3>
            <p>Log sightings of flora and fauna with geotagged photos to monitor biodiversity.</p>
          </div>

          <div className="feature-card">
            <Leaf size={40} />
            <h3>Tree Tracking</h3>
            <p>Track planted trees and help with global reforestation efforts easily.</p>
          </div>

          <div className="feature-card">
            <Shield size={40} />
            <h3>Threat Alerts</h3>
            <p>Report environmental hazards to enable quick conservation responses.</p>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-ball"
        />
      </div>
    </div>
  );
};

export default Hero;