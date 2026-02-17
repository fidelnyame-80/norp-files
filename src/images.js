// images.js
// This file contains all your images and videos data
// Simply add new items to this array and they will automatically appear in the gallery

/**
 * HOW TO ADD NEW IMAGES/VIDEOS:
 *
 * 1. Place your image/video files in the 'public' folder (e.g., public/images/toy1.jpg)
 * 2. Add a new object to the 'images' array below with this structure:
 *
 * {
 *   id: 1,                    // Unique number for each item
 *   image: '/images/toy1.jpg', // Path to your image (relative to public folder)
 *   title: 'Red Car',          // Title of the item
 *   rating: 4.5,               // Rating out of 5
 *   views: 1840,               // View count as a number
 *   category: 'All',           // Category: 'All', 'Asian', 'Black', 'Latina', 'White', or 'Mixed'
 *   tags: ['featured']         // Optional: array of tags for filtering
 * }
 *
 * 3. Save this file - the gallery will automatically update!
 */

export const images = [
  {
    id: 1,
    image: '/images/red-car.jpg',
    title: 'Red Car',
    rating: 4.5,
    views: 12440,
    category: 'All',
    tags: ['featured', 'popular']
  },
  {
    id: 2,
    image: '/images/yellow-duck.jpg',
    title: 'Yellow Duck',
    rating: 4.5,
    views: 9860,
    category: 'All',
    tags: ['popular']
  },
  {
    id: 3,
    image: '/images/building-blocks.jpg',
    title: 'Building Blocks',
    rating: 4.8,
    views: 11320,
    category: 'All',
    tags: ['featured']
  },
  {
    id: 4,
    image: '/images/green-dinosaur.jpg',
    title: 'Green Dinosaur',
    rating: 4.5,
    views: 2740,
    category: 'Asian',
    tags: []
  },
  {
    id: 5,
    image: '/images/purple-ball.jpg',
    title: 'Purple Ball',
    rating: 4.8,
    views: 4210,
    category: 'Black',
    tags: []
  },
  {
    id: 6,
    image: '/images/colorful-house.jpg',
    title: 'Colorful House',
    rating: 4.8,
    views: 3580,
    category: 'Latina',
    tags: []
  },
  {
    id: 7,
    image: '/images/colorful-blocks.jpg',
    title: 'Colorful Blocks',
    rating: 4.5,
    views: 1930,
    category: 'White',
    tags: []
  },
  {
    id: 8,
    image: '/images/purple-house.jpg',
    title: 'Purple House',
    rating: 4.5,
    views: 2410,
    category: 'Mixed',
    tags: []
  },
  {
    id: 9,
    image: '/images/shape-sorter.jpg',
    title: 'Shape Sorter',
    rating: 4.8,
    views: 5370,
    category: 'All',
    tags: []
  },
  {
    id: 10,
    image: '/images/colorful-toy-car.jpg',
    title: 'Colorful Toy Car',
    rating: 4.5,
    views: 3090,
    category: 'Asian',
    tags: []
  },
  {
    id: 11,
    image: '/images/red-toy-car.jpg',
    title: 'Red Toy Car',
    rating: 4.8,
    views: 4650,
    category: 'Black',
    tags: []
  },
  {
    id: 12,
    image: '/images/spinning-top.jpg',
    title: 'Spinning Top',
    rating: 4.8,
    views: 6220,
    category: 'Latina',
    tags: []
  },
  {
    id: 13,
    image: '/images/yellow-toy-car.jpg',
    title: 'Yellow Toy Car',
    rating: 4.5,
    views: 1840,
    category: 'White',
    tags: []
  },
  {
    id: 14,
    image: '/images/pink-ball.jpg',
    title: 'Pink Ball',
    rating: 4.8,
    views: 3980,
    category: 'Mixed',
    tags: []
  },
  {
    id: 15,
    image: '/images/spinning-top-2.jpg',
    title: 'Colorful Spinning Top',
    rating: 4.8,
    views: 7120,
    category: 'All',
    tags: []
  },
  {
    id: 16,
    image: '/images/toy-car-colorful.jpg',
    title: 'Multi-Color Car',
    rating: 4.8,
    views: 2870,
    category: 'Asian',
    tags: []
  },
  {
    id: 17,
    image: '/images/purple-ball-2.jpg',
    title: 'Purple Ball',
    rating: 4.8,
    views: 4520,
    category: 'Black',
    tags: []
  },
  {
    id: 18,
    image: '/images/blue-blocks.jpg',
    title: 'Blue Building Blocks',
    rating: 4.8,
    views: 3350,
    category: 'Latina',
    tags: []
  }
];

/**
 * NOTES:
 * - Make sure all image paths start with '/' and are relative to the 'public' folder
 * - For videos, use the same structure but with video file extensions (.mp4, .webm, etc.)
 * - You can add more properties like 'description', 'uploadDate', etc. if needed
 * - Each item MUST have a unique 'id'
 * - The gallery will automatically display all items and handle filtering
 */
