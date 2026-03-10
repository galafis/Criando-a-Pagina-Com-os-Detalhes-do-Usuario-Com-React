import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import UserStats from './components/UserStats';
import RepoList from './components/RepoList';
import { fetchUser, fetchUserRepos } from './services/githubApi';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, repoData] = await Promise.all([
        fetchUser(username),
        fetchUserRepos(username, 'updated', 30),
      ]);

      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>&#9888;</span>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {isLoading && (
          <div style={styles.loading}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Fetching user data...</p>
          </div>
        )}

        {user && !isLoading && (
          <>
            <UserProfile user={user} />
            <UserStats repos={repos} />
            <RepoList repos={repos} />
          </>
        )}

        {!user && !isLoading && !error && (
          <div style={styles.welcome}>
            <h2 style={styles.welcomeTitle}>Welcome!</h2>
            <p style={styles.welcomeText}>
              Enter a GitHub username above to explore their profile,
              repositories, and contribution statistics.
            </p>
            <div style={styles.suggestions}>
              <p style={styles.suggestionsLabel}>Try searching for:</p>
              <div style={styles.suggestionsRow}>
                {['torvalds', 'gaearon', 'sindresorhus', 'tj'].map((name) => (
                  <button
                    key={name}
                    style={styles.suggestionBtn}
                    onClick={() => handleSearch(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          GitHub Profile Viewer &mdash; Built with React
        </p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#010409',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    color: '#c9d1d9',
  },
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#2d1214',
    border: '1px solid #f85149',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  errorIcon: {
    fontSize: '1.5rem',
    color: '#f85149',
  },
  errorText: {
    color: '#f85149',
    margin: 0,
    fontSize: '0.95rem',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #30363d',
    borderTop: '4px solid #58a6ff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    marginTop: '1rem',
    color: '#8b949e',
    fontSize: '0.95rem',
  },
  welcome: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#0d1117',
    borderRadius: '12px',
    border: '1px solid #30363d',
  },
  welcomeTitle: {
    color: 'white',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  welcomeText: {
    color: '#8b949e',
    fontSize: '1rem',
    maxWidth: '480px',
    margin: '0 auto 2rem',
    lineHeight: 1.5,
  },
  suggestions: {
    marginTop: '1rem',
  },
  suggestionsLabel: {
    color: '#8b949e',
    fontSize: '0.85rem',
    marginBottom: '0.75rem',
  },
  suggestionsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  suggestionBtn: {
    padding: '8px 18px',
    backgroundColor: '#161b22',
    color: '#58a6ff',
    border: '1px solid #30363d',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'background-color 0.2s',
  },
  footer: {
    textAlign: 'center',
    padding: '2rem 1rem',
    borderTop: '1px solid #21262d',
  },
  footerText: {
    color: '#484f58',
    fontSize: '0.85rem',
    margin: 0,
  },
};

export default App;
