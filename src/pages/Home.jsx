import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../images';
import { CATEGORIES, filterBySearch, getCategoryPath } from '../galleryModel';
import GalleryGrid from '../Components/GalleryGrid';

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const filteredImages = useMemo(() => {
    return filterBySearch(images, searchInput);
  }, [searchInput]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchInput.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  return (
    <>
      <header className="header">
        <div>
          <h1 className="header-title">Home</h1>
          <p className="header-subtitle">Trending picks, fresh filters, faster discovery.</p>
        </div>
        <span className="page-meta">{filteredImages.length} results</span>
      </header>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search gallery"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button type="submit" className="search-submit">Search</button>
        {searchInput && (
          <button type="button" className="search-clear" onClick={() => setSearchInput('')}>
            Clear
          </button>
        )}
      </form>

      <div className="filter-tabs">
        {CATEGORIES.map((category) => (
          <button key={category} className="tab" onClick={() => navigate(getCategoryPath(category))}>
            {category}
          </button>
        ))}
      </div>

      <p className="home-disclosure">
        All images shown are AI generated. No real people are involved.
      </p>




      <GalleryGrid
        items={filteredImages}
        emptyMessage="No items found for the selected filters."
      />
    </>
  );
}

export default Home;
