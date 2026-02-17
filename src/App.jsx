import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Popular from './pages/Popular';
import Search from './pages/Search';
import { CATEGORIES, getCategoryPath } from './galleryModel';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
          </Routes>

          <footer className="content-policy">
            Content policy: all gallery assets are AI generated, all subjects are fictional, and no real people are
            depicted.
          </footer>
        </main>
      </div>
    </Router>
  );
}

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: 'Popular', path: '/popular' },
    { label: 'Search', path: '/search' }
  ];

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <img className="brand-logo" src="/images/synthgallery-logo.png" alt="SynthGallery logo" />
        <h2 className="sidebar-title">SynthGallery</h2>
      </div>

      <nav className="nav-section">
        {navItems.map((item) => {
          const isActive =
            item.path === '/categories'
              ? location.pathname.startsWith('/categories')
              : location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="categories-section">
        <h3 className="categories-title">Categories</h3>
        <div className="sidebar-categories-list">
          {CATEGORIES.map((category) => {
            const path = getCategoryPath(category);
            const isActive = path === '/categories' ? location.pathname === '/categories' : location.pathname === path;

            return (
              <Link key={path} to={path} className={`category-btn ${isActive ? 'active' : ''}`}>
                <span>{category}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="sidebar-policy">
        <h4 className="sidebar-policy-title">AI Disclosure</h4>
        <p className="sidebar-note">All images shown are AI generated. No real people are involved.</p>
      </div>
    </aside>
  );
}

export default App;
