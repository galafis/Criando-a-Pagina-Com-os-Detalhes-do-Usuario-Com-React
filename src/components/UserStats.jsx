import React from 'react';

function UserStats({ repos }) {
  if (!repos || repos.length === 0) {
    return null;
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const languageCounts = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalRepos = repos.length;
  const forkedRepos = repos.filter(r => r.fork).length;
  const originalRepos = totalRepos - forkedRepos;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Statistics</h3>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{totalStars}</span>
          <span style={styles.statLabel}>Total Stars</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{totalForks}</span>
          <span style={styles.statLabel}>Total Forks</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{originalRepos}</span>
          <span style={styles.statLabel}>Original Repos</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{Object.keys(languageCounts).length}</span>
          <span style={styles.statLabel}>Languages</span>
        </div>
      </div>

      {topLanguages.length > 0 && (
        <div style={styles.languageSection}>
          <h4 style={styles.subTitle}>Top Languages</h4>
          <div style={styles.languageBar}>
            {topLanguages.map(([lang, count]) => (
              <div
                key={lang}
                style={{
                  ...styles.langSegment,
                  flex: count,
                  backgroundColor: getLanguageColor(lang),
                }}
                title={`${lang}: ${count} repos`}
              />
            ))}
          </div>
          <div style={styles.languageLabels}>
            {topLanguages.map(([lang, count]) => (
              <span key={lang} style={styles.langLabel}>
                <span style={{ ...styles.langDot, backgroundColor: getLanguageColor(lang) }} />
                {lang} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C#': '#178600',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Dart: '#00B4AB',
  };
  return colors[language] || '#8b949e';
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: '#0d1117',
    borderRadius: '12px',
    border: '1px solid #30363d',
    marginBottom: '2rem',
  },
  title: {
    color: 'white',
    fontSize: '1.3rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #30363d',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#161b22',
    borderRadius: '8px',
    border: '1px solid #30363d',
  },
  statValue: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#58a6ff',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#8b949e',
    marginTop: '0.3rem',
  },
  languageSection: {
    marginTop: '1rem',
  },
  subTitle: {
    color: '#c9d1d9',
    fontSize: '1rem',
    marginBottom: '0.75rem',
  },
  languageBar: {
    display: 'flex',
    height: '10px',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '0.75rem',
    gap: '2px',
  },
  langSegment: {
    borderRadius: '2px',
    minWidth: '4px',
  },
  languageLabels: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  langLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: '#8b949e',
  },
  langDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
};

export default UserStats;
