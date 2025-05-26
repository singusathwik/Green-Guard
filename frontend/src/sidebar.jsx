import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './assets/letter-g.png';
import './Sidebar.css';
import { FaLeaf, FaTree, FaExclamationTriangle, FaCalendar, FaGraduationCap, FaBell, FaStar } from 'react-icons/fa';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const iconVariants = {
        hover: { scale: 1.2, rotate: 10, color: '#34D399' },
        rest: { scale: 1, rotate: 0, color: '#fff' },
    };

    return (
        <motion.div
            className={`sidebar${isHovered ? ' expanded' : ''}`}
            animate={{ width: isHovered ? 200 : 70 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="sidebar-logo"
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <img src={logo} alt="Logo" />
            </motion.div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaLeaf />
                            </motion.div>
                            <span className="link-text">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/trees">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaTree />
                            </motion.div>
                            <span className="link-text">Trees</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/threats">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaExclamationTriangle />
                            </motion.div>
                            <span className="link-text">Threats</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/events">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaCalendar />
                            </motion.div>
                            <span className="link-text">Events</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/resources">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaGraduationCap />
                            </motion.div>
                            <span className="link-text">Resources</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/notifications">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaBell />
                            </motion.div>
                            <span className="link-text">Notifications</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/leaderboard">
                            <motion.div variants={iconVariants} whileHover="hover" initial="rest">
                                <FaStar />
                            </motion.div>
                            <span className="link-text">Leaderboard</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </motion.div>
    );
};

export default Sidebar;