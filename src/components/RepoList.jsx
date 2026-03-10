import React from 'react';

function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No public repositories found.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Repositories ({repos.length})</h3>
      <div style={styles.grid}>
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
          >
            <div style={styles.cardHeader}>
              <span style={styles.repoIcon}>&#128218;</span>
              <h4 style={styles.repoName}>{repo.name}</h4>
            </div>
            {repo.description && (
              <p style={styles.description}>{repo.description}</p>
            )}
            <div style={styles.meta}>
              {repo.language && (
                <span style={styles.language}>
                  <span style={styles.langDot}>&#9679;</span>
                  {repo.language}
                </span>
              )}
              <span style={styles.metaItem}>&#11088; {repo.stargazers_count}</span>
              <span style={styles.metaItem}>&#128268; {repo.forks_count}</span>
              {repo.updated_at && (
                <span style={styles.metaItem}>
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '2rem',
  },
  title: {
    color: 'white',
    fontSize: '1.3rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #30363d',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1rem',
  },
  card: {
    display: 'block',
    padding: '1.25rem',
    backgroundColor: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  repoIcon: {
    fontSize: '1.1rem',
  },
  repoName: {
    color: '#58a6ff',
    fontSize: '1rem',
    fontWeight: 600,
    margin: 0,
  },
  description: {
    color: '#8b949e',
    fontSize: '0.85rem',
    lineHeight: 1.4,
    marginBottom: '0.75rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    fontSize: '0.8rem',
    color: '#8b949e',
  },
  language: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  langDot: {
    color: '#f1e05a',
    fontSize: '0.6rem',
  },
  metaItem: {},
  empty: {
    textAlign: 'center',
    padding: '2rem',
    color: '#8b949e',
  },
};

export default RepoList;
