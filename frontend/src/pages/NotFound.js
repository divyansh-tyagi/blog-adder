import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-4 scale-in" style={{ maxWidth: '600px', margin: '5rem auto' }}>
      <div style={{ fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>404</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Page Not Found</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--dark-gray)', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-with-icon" style={{ padding: '0.85rem 2rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
