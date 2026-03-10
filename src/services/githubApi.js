/**
 * GitHub API Service
 *
 * Fetches user profile and repository data from the GitHub public API.
 */

const BASE_URL = 'https://api.github.com';

export async function fetchUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User "${username}" not found.`);
    }
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUserRepos(username, sort = 'updated', perPage = 10) {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=${sort}&per_page=${perPage}&direction=desc`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUserFollowers(username, perPage = 10) {
  const response = await fetch(
    `${BASE_URL}/users/${username}/followers?per_page=${perPage}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch followers: ${response.statusText}`);
  }

  return response.json();
}
