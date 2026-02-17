export const CATEGORIES = ['All', 'Asian', 'Black', 'Latina', 'White', 'Mixed'];

export const TAGS = ['featured', 'popular'];

export function normalizeCategory(value) {
  if (!value) {
    return 'All';
  }

  const normalized = String(value).trim().toLowerCase();
  const matched = CATEGORIES.find((category) => category.toLowerCase() === normalized);
  return matched || 'All';
}

export function getCategoryPath(category) {
  const normalized = normalizeCategory(category);
  return normalized === 'All' ? '/categories' : `/categories/${normalized.toLowerCase()}`;
}

export function filterByCategory(items, category) {
  const activeCategory = normalizeCategory(category);
  if (activeCategory === 'All') {
    return items;
  }
  return items.filter((item) => item.category === activeCategory);
}

export function filterBySearch(items, query) {
  const normalizedQuery = String(query || '').trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => {
    const inTitle = item.title.toLowerCase().includes(normalizedQuery);
    const inDescription = item.description?.toLowerCase().includes(normalizedQuery);
    const inCategory = item.category?.toLowerCase().includes(normalizedQuery);
    const inTags = item.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    return inTitle || inDescription || inCategory || inTags;
  });
}

export function filterPopular(items) {
  return items.filter((item) => item.tags?.includes('popular'));
}
