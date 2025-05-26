import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { MapPin, Leaf, Users, Trophy, BookOpen, ArrowRight, Check, Globe } from 'lucide-react';

import Hero from './Hero';

const HomePage = () => {
    const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });

    const features = [
        { icon: <MapPin size={24} />, title: 'Wildlife & Flora Sighting Map', description: 'Log sightings with geotagged photos.', link: '/sightings' },
        { icon: <Leaf size={24} />, title: 'Tree Plantation Tracker', description: 'Register new trees, monitor growth.', link: '/tree-tracker' },
        { icon: <Users size={24} />, title: 'Conservation Activity Board', description: 'Join local conservation events.', link: '/activities' },
        { icon: <Trophy size={24} />, title: 'Biodiversity Leaderboard', description: 'Recognize contributors to conservation.', link: '/leaderboard' },
        { icon: <BookOpen size={24} />, title: 'Educational Resources', description: 'Learn about biodiversity and SDGs.', link: '/resources' },
    ];

    useEffect(() => {
        const animateValue = (el, start, end, duration) => {
            let startTime = null;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                el.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const end = parseInt(el.getAttribute('data-value'), 10);
                    animateValue(el, 0, end, 2000);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter-value').forEach(el => observer.observe(el));

        return () => document.querySelectorAll('.counter-value').forEach(el => observer.unobserve(el));
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Poppins, sans-serif' }}>
            <Hero />

            {/* Features Section */}
            <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>Powerful Features for Environmental Stewardship</h2>
                        <p style={{ maxWidth: '700px', margin: '1rem auto', color: '#6b7280', fontSize: '1.125rem' }}>Our platform provides tools to monitor, protect, and enhance the environment.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, idx) => (
                            <Link to={feature.link} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '2rem', transition: 'all 0.3s', height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <div style={{ marginBottom: '1rem', color: '#065f46' }}>{feature.icon}</div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: '#6b7280' }}>{feature.description}</p>
                                    <div style={{ color: '#065f46', marginTop: '1rem', fontWeight: '500', display: 'flex', alignItems: 'center' }}>Explore <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} /></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section style={{ background: 'linear-gradient(to right, #065f46, #047857)', padding: '5rem 1rem', color: 'white' }}>
                <div ref={ref1} style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Our Collective Impact</h2>
                    <p style={{ marginBottom: '3rem', fontSize: '1.125rem' }}>Together, we are making a measurable difference!</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
                        {[
                            { label: 'Wildlife Sightings', value: 15783 },
                            { label: 'Trees Planted', value: 42567 },
                            { label: 'Community Events', value: 856 },
                            { label: 'Active Members', value: 12490 }
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="counter-value" data-value={stat.value} style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0</div>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ backgroundColor: '#f0f2f5', padding: '4rem 1rem' }}>
                <div ref={ref2} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>How It Works</h2>
                        <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                            Join our platform in just a few simple steps and start contributing to conservation efforts in your community.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {["Create an Account", "Explore Features", "Make an Impact"].map((title, idx) => (
                            <div key={idx} style={{ textAlign: 'center', position: 'relative' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fff', color: '#065f46', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>{idx + 1}</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>{title}</h3>
                                <p style={{ color: '#6b7280' }}>
                                    {idx === 0 ? "Sign up and create your environmental steward profile." : idx === 1 ? "Use tools to log sightings, track trees, join activities." : "Contribute, participate, and track your positive impact."}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button style={{ backgroundColor: '#10b981', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                            Get Started Today
                        </button>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section style={{ backgroundColor: '#fff', padding: '4rem 1rem' }}>
                <div ref={ref3} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Success Stories</h2>
                        <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                            See how communities are using our platform to create meaningful environmental change.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: "Urban Forest Initiative", location: "Portland, OR", img: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg" },
                            { title: "Coastal Cleanup Campaign", location: "Santa Monica, CA", img: "https://images.pexels.com/photos/1497310/pexels-photo-1497310.jpeg" },
                            { title: "School Biodiversity Program", location: "Chicago, IL", img: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg" }
                        ].map((story, idx) => (
                            <div key={idx} style={{ backgroundColor: '#f9fafb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <img src={story.img} alt={story.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>{story.title}</h3>
                                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Story description here for {story.title}.</p>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                                        <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                                        {story.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/activities" style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
                            View More Success Stories
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ backgroundColor: 'green', padding: '5rem 1rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: '0', opacity: '0.1' }}>
                    <img src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div ref={ref4} style={{ position: 'relative', zIndex: '10', maxWidth: '1100px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '1rem', padding: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center', gap: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Join Our Global Movement</h2>
                            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                Together, we can make a difference. Start contributing to conservation efforts in your community today.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                {['Access to all conservation tools', 'Connect with environmental stewards', 'Track your impact', 'Learn via expert resources'].map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <Check style={{ color: '#10b981', marginRight: '0.5rem' }} size={18} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button style={{ backgroundColor: '#10b981', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', border: 'none' }}>
                                Create Free Account
                            </button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <img src="https://images.pexels.com/photos/6956800/pexels-photo-6956800.jpeg" alt="Conservation" style={{ borderRadius: '0.75rem', width: '100%', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' }} />
                            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: '#fff', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                <Globe style={{ color: '#10b981', marginRight: '0.5rem' }} size={24} />
                                <div>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Global Network</p>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>125+ countries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;