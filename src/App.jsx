import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Page2257 from './pages/Page2257';
import { CATEGORIES, getCategoryPath } from './galleryModel';

const AGE_VERIFICATION_KEY = 'beaufiniti_age_verified';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(AGE_VERIFICATION_KEY) === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('age-gate-open', !isAgeVerified);
    return () => document.body.classList.remove('age-gate-open');
  }, [isAgeVerified]);

  const handleAgeConfirm = () => {
    window.localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
    setIsAgeVerified(true);
  };

  const handleAgeDecline = () => {
    window.location.href = 'https://www.google.com';
  };

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
            <Route path="/2257" element={<Page2257 />} />
          </Routes>

          <footer className="content-policy">
            <p>
              Content policy: all gallery assets are AI generated, all subjects are fictional, and no real people are
              depicted.
            </p>
          </footer>
        </main>
      </div>

      {!isAgeVerified && (
        <AgeVerificationGate onConfirm={handleAgeConfirm} onDecline={handleAgeDecline} />
      )}
    </Router>
  );
}

function AgeVerificationGate({ onConfirm, onDecline }) {
  return (
    <div className="age-gate-backdrop">
      <section
        className="age-gate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
      >
        <p className="age-gate-kicker">Adults Only</p>
        <h2 id="age-gate-title" className="age-gate-title">Age Verification</h2>
        <p id="age-gate-description" className="age-gate-description">
          This website contains adult-oriented, AI-generated content and is restricted to users 18 years or older.
        </p>
        <div className="age-gate-actions">
          <button type="button" className="age-gate-enter" onClick={onConfirm}>
            I am 18+ Enter
          </button>
          <button type="button" className="age-gate-exit" onClick={onDecline}>
            Exit
          </button>
        </div>
        <p className="age-gate-footnote">By entering, you confirm that you are at least 18 years old.</p>
      </section>
    </div>
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
        <img className="brand-logo" src="/images/beaufiniti.webp" alt="beaufiniti logo" />
        <h2 className="sidebar-title">beaufiniti</h2>
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
        <Link className="policy-link sidebar-2257-link" to="/2257">
          18 U.S.C. 2257 Statement
        </Link>
      </div>
    </aside>
  );
}

export default App;
