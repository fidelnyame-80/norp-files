import React, { useEffect, useState } from 'react';

function GalleryGrid({ items, emptyMessage }) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    if (!selectedItemId) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedItemId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedItemId]);

  const selectedItem = items.find((item) => item.id === selectedItemId) || null;
  const sideItems = selectedItem ? items.filter((item) => item.id !== selectedItem.id) : [];

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < fullStars ? 'filled' : 'empty'}`}>
        {index < fullStars ? '★' : '☆'}
      </span>
    ));
  };

  const formatViews = (views) => {
    const numericViews = Number(views) || 0;
    if (numericViews >= 1000000) {
      return `${(numericViews / 1000000).toFixed(1)}M views`;
    }
    if (numericViews >= 1000) {
      return `${(numericViews / 1000).toFixed(1)}k views`;
    }
    return `${numericViews} views`;
  };

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button
            type="button"
            className="gallery-item"
            key={item.id}
            onClick={() => setSelectedItemId(item.id)}
          >
            <div className="image-container">
              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
                decoding="async"
              />
            </div>
            <div className="item-info">
              <div className="rating-container">
                <h3 className="item-title">{item.title}</h3>
                <div className="rating-pill">
                  <div className="stars" aria-label={`Rated ${item.rating} out of 5`}>
                    {renderStars(item.rating)}
                  </div>
                  <span className="rating-number">{item.rating}</span>
                </div>
              </div>
              <div className="meta-row">
                <span className="chip">{item.category}</span>
                <span className="chip">{formatViews(item.views)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <div className="no-results">
          <p>{emptyMessage}</p>
        </div>
      )}

      {selectedItem && (
        <div className="viewer-backdrop" onClick={() => setSelectedItemId(null)}>
          <div className="viewer-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="viewer-close" onClick={() => setSelectedItemId(null)}>
              Close
            </button>

            <div className="viewer-main">
              <img src={selectedItem.image} alt={selectedItem.title} className="viewer-image" />
              <div className="viewer-meta">
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.category} · {formatViews(selectedItem.views)} · {selectedItem.rating}/5</p>
              </div>
            </div>

            <aside className="viewer-side">
              {sideItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="viewer-thumb"
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <img src={item.image} alt={item.title} decoding="async" />
                  <span>{item.title}</span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryGrid;
