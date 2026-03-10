import React, { useState } from 'react';

function SearchBar({ onSearch, isLoading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>GitHub Profile Viewer</h1>
      <p style={styles.subtitle}>Search for any GitHub user to view their profile and repositories</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          style={styles.input}
          disabled={isLoading}
        />
        <button type="submit" style={styles.button} disabled={isLoading || !username.trim()}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#0d1117',
    color: 'white',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    fontWeight: 800,
  },
  subtitle: {
    color: '#8b949e',
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: '0 auto',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #30363d',
    borderRadius: '8px',
    backgroundColor: '#161b22',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#238636',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
};

export default SearchBar;
