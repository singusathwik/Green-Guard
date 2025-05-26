import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Leaf, Mail, Instagram, Twitter, Facebook, Youtube, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="footer"
    >
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <Leaf className="footer-leaf" />
              <span>Green Guard</span>
            </Link>
            <p className="footer-description">
              Empowering communities to monitor, protect, and enhance their local ecosystems through collaborative conservation efforts.
            </p>
            <div className="footer-socials">
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/dashboard/wildlife">Wildlife Sightings</Link></li>
              <li><Link to="/dashboard/trees">Tree Tracker</Link></li>
              <li><Link to="/dashboard/threats">Threat Alerts</Link></li>
              <li><Link to="/dashboard/events">Conservation Activities</Link></li>
              <li><Link to="/dashboard/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/dashboard/resources">Educational Materials</Link></li>
              <li><a href="#">Conservation Guides</a></li>
              <li><a href="#">Biodiversity Research</a></li>
              <li><a href="#">Sustainable Practices</a></li>
              <li><a href="#">Partner Organizations</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Stay Updated</h3>
            <p className="footer-description">
              Subscribe to our newsletter for the latest conservation news and community events.
            </p>
            <form className="footer-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit"><Mail size={16} /></button>
            </form>
            <p className="footer-privacy">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} GreenGuard. All rights reserved.</div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div className="footer-made">
          <p>Made with <Heart size={12} className="footer-heart" /> for nature and communities worldwide</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;