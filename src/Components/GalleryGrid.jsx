import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_ITEMS_PER_PAGE = 9;

function GalleryGrid({ items, emptyMessage, itemsPerPage = DEFAULT_ITEMS_PER_PAGE }) {
  const [page, setPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [items]);

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

  const visibleItems = useMemo(() => {
    return items.slice(0, page * itemsPerPage);
  }, [items, page, itemsPerPage]);

  const canLoadMore = visibleItems.length < items.length;
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
        {visibleItems.map((item) => (
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
                loading="lazy"
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

      {visibleItems.length === 0 && (
        <div className="no-results">
          <p>{emptyMessage}</p>
        </div>
      )}

      {canLoadMore && (
        <div className="pagination-row">
          <button className="load-more-btn" onClick={() => setPage((currentPage) => currentPage + 1)}>
            Load More
          </button>
          <p className="pagination-meta">
            Showing {visibleItems.length} of {items.length}
          </p>
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
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
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
