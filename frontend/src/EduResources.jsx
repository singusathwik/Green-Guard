import React from 'react';
import './EduResources.css';

const EduResources = () => {
    // Removed useState and useEffect since no API call is needed
    // Static placeholder data or empty grid for future use
    const resources = []; // Can be populated later with static or API data

    return (
        <div className="edu-resources">
            <h2>Educational Resources</h2>
            <p>Explore curated guides, videos, and images on biodiversity, conservation, and SDG 15.</p>
            <div className="resource-grid">
                {resources.length === 0 ? (
                    <p>No resources available at this time. Check back later for updates!</p>
                ) : (
                    resources.map((resource) => (
                        <div key={resource._id} className="resource-card">
                            <h3>{resource.title}</h3>
                            <p><strong>Category:</strong> {resource.category}</p>
                            {resource.type === 'video' ? (
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={resource.url}
                                    title={resource.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={resource.url} alt={resource.title} className="resource-image" />
                            )}
                            <p>{resource.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EduResources;