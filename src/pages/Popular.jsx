import React, { useMemo } from 'react';
import { images } from '../images';
import { filterPopular } from '../galleryModel';
import GalleryGrid from '../Components/GalleryGrid';

function Popular() {
  const popularImages = useMemo(() => filterPopular(images), []);

  return (
    <>
      <header className="header">
        <div>
          <h1 className="header-title">Popular</h1>
          <p className="header-subtitle">Most-viewed items from the current collection.</p>
        </div>
        <span className="page-meta">{popularImages.length} results</span>
      </header>

      

      <GalleryGrid
        items={popularImages}
        emptyMessage="No popular items found."
      />
    </>
  );
}

export default Popular;
