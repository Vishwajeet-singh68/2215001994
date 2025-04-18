import React from 'react';

export default function Navbar({ setPage }) {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Social Analytics</h1>
      <div style={styles.links}>
        <button onClick={() => setPage('feed')} style={styles.link}>
          Feed
        </button>
        <button onClick={() => setPage('top-users')} style={styles.link}>
          Top Users
        </button>
        <button onClick={() => setPage('trending-posts')} style={styles.link}>
          Trending Posts
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
  },
};