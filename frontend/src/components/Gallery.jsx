import { useState, useEffect } from 'react';
import { fetchGallery } from '../api/client';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then(setImages)
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="gallery" id="gallery">
        <div className="container">
          <h2 className="section-title">Explore <span className="accent">Munnar</span></h2>
          <p className="section-subtitle">Loading gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <h2 className="section-title">Explore <span className="accent">Munnar</span></h2>
        <p className="section-subtitle">A glimpse into the beauty that awaits you</p>
        <div className="gallery-grid">
          {images.map((item) => (
            <div
              className="gallery-item"
              key={item.id || item.image_url}
              style={{
                background: item.image_url
                  ? `url(${item.image_url}) center/cover no-repeat`
                  : 'linear-gradient(135deg, #1e293b, #065f46)',
              }}
            >
              {item.source === 'instagram' && (
                <span className="instagram-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </span>
              )}
              <div className="gallery-overlay">
                <span>{item.caption || 'Munnar'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
