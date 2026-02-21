import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { images } from '../images';
import { filterBySearch } from '../galleryModel';
import GalleryGrid from '../Components/GalleryGrid';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const filteredImages = useMemo(() => {
    return filterBySearch(images, query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    setSearchParams(trimmed ? { q: trimmed } : {});
  };

  const clearSearch = () => {
    setInputValue('');
    setSearchParams({});
  };

  return (
    <>
      <header className="header">
        <div>
          <h1 className="header-title">Search</h1>
          <p className="header-subtitle">Find items by title, category, or tags.</p>
        </div>
        <span className="page-meta">{filteredImages.length} results</span>
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search by title"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit" className="search-submit">Search</button>
        {(inputValue || query) && (
          <button type="button" className="search-clear" onClick={clearSearch}>
            Clear
          </button>
        )}
      </form>

      <GalleryGrid
        items={filteredImages}
        emptyMessage={`No items found for "${query}".`}
      />
    </>
  );
}

export default Search;
