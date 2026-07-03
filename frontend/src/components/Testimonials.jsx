import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../api/client';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="container">
          <h2 className="section-title">What <span className="accent">Explorers Say</span></h2>
          <p className="section-subtitle">Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What <span className="accent">Explorers Say</span></h2>
        <p className="section-subtitle">Real experiences from fellow travelers</p>
        {testimonials.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="stars">{renderStars(t.rating)}</div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <div className="avatar">{t.avatar_initials}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
