import React, { useState } from 'react';
import logo from './assets/letter-g.png';
import './Sidebar.css'; // Assuming you have a CSS file for styling
import { FaLeaf, FaTree, FaExclamationTriangle, FaCalendar, FaBook, FaEnvelope } from 'react-icons/fa';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`sidebar ${isHovered ? "expanded" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="sidebar-logo">
                <img src={logo} alt="Logo" style={{ width: "75px" }} />
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li><a href="/"><FaLeaf /> {isHovered && <span className="link-text">Wildlife</span>}</a></li>
                    <li><a href="#"><FaTree /> {isHovered && <span className="link-text">Tree Tracker</span>}</a></li>
                    <li><a href="#"><FaExclamationTriangle /> {isHovered && <span className="link-text">Threat Alerts</span>}</a></li>
                    <li><a href="#"><FaCalendar /> {isHovered && <span className="link-text">Events</span>}</a></li>
                    <li><a href="#"><FaBook /> {isHovered && <span className="link-text">Resources</span>}</a></li>
                    <li><a href="#"><FaEnvelope /> {isHovered && <span className="link-text">Messages</span>}</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
