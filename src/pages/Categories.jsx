import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { images } from '../images';
import { CATEGORIES, filterByCategory, getCategoryPath, normalizeCategory } from '../galleryModel';
import GalleryGrid from '../Components/GalleryGrid';

function Categories() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const normalizedParam = (category || '').trim().toLowerCase();
  const fromQuery = (searchParams.get('filter') || '').trim().toLowerCase();
  const activeCategory = normalizeCategory(normalizedParam || fromQuery);

  const filteredImages = useMemo(() => {
    return filterByCategory(images, activeCategory);
  }, [activeCategory]);

  return (
    <>
      <header className="header">
        <div>
          <h1 className="header-title">Categories</h1>
          <p className="header-subtitle">Browse by category with direct routes.</p>
        </div>
        <span className="page-meta">{filteredImages.length} results</span>
      </header>

      <div className="category-links">
        {CATEGORIES.map((item) => {
          const path = getCategoryPath(item);
          return (
            <Link key={item} to={path} className={`category-link ${activeCategory === item ? 'active' : ''}`}>
              {item}
            </Link>
          );
        })}
      </div>

      <GalleryGrid
        items={filteredImages}
        emptyMessage="No items found in this category."
      />
    </>
  );
}

export default Categories;
