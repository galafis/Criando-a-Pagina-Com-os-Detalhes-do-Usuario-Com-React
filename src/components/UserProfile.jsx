import React from 'react';

function UserProfile({ user }) {
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={styles.card}>
      <div style={styles.avatarSection}>
        <img src={user.avatar_url} alt={user.login} style={styles.avatar} />
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={styles.viewProfile}>
          View on GitHub
        </a>
      </div>
      <div style={styles.info}>
        <h2 style={styles.name}>{user.name || user.login}</h2>
        <p style={styles.login}>@{user.login}</p>
        {user.bio && <p style={styles.bio}>{user.bio}</p>}
        <div style={styles.details}>
          {user.company && (
            <span style={styles.detail}>&#127970; {user.company}</span>
          )}
          {user.location && (
            <span style={styles.detail}>&#128205; {user.location}</span>
          )}
          {user.blog && (
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
               target="_blank" rel="noopener noreferrer" style={styles.link}>
              &#128279; {user.blog}
            </a>
          )}
          <span style={styles.detail}>&#128197; Joined {joinDate}</span>
        </div>
        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{user.public_repos}</span>
            <span style={styles.statLabel}>Repositories</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{user.followers}</span>
            <span style={styles.statLabel}>Followers</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{user.following}</span>
            <span style={styles.statLabel}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    backgroundColor: '#0d1117',
    borderRadius: '12px',
    border: '1px solid #30363d',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '3px solid #30363d',
  },
  viewProfile: {
    color: '#58a6ff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '8px 16px',
    border: '1px solid #30363d',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  info: {
    flex: 1,
    minWidth: '280px',
    color: '#c9d1d9',
  },
  name: {
    fontSize: '1.8rem',
    color: 'white',
    marginBottom: '0.2rem',
  },
  login: {
    color: '#8b949e',
    fontSize: '1.2rem',
    marginBottom: '0.75rem',
  },
  bio: {
    fontSize: '1rem',
    lineHeight: 1.5,
    marginBottom: '1rem',
    color: '#c9d1d9',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1.5rem',
  },
  detail: {
    fontSize: '0.9rem',
    color: '#8b949e',
  },
  link: {
    fontSize: '0.9rem',
    color: '#58a6ff',
    textDecoration: 'none',
  },
  stats: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    backgroundColor: '#161b22',
    borderRadius: '8px',
    border: '1px solid #30363d',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#8b949e',
    marginTop: '0.2rem',
  },
};

export default UserProfile;
