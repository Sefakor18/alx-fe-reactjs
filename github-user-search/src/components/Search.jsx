import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = username.trim();
    if (!q) return;
    setLoading(true);
    setError('');
    setUser(null);

    const data = await fetchUserData(q);
    setLoading(false);

    if (!data) setError("Looks like we can't find the user");
    else setUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch} aria-label="search-form">
        <input
          data-testid="username-input"
          aria-label="username-input"
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button data-testid="search-button" type="submit">Search</button>
      </form>

      {loading && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error" style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div data-testid="result">
          <img data-testid="avatar" src={user.avatar_url} alt={user.login} width="100" />
          <h2 data-testid="name">{user.name || user.login}</h2>
          <p data-testid="login">@{user.login}</p>
          <a data-testid="profile-link" href={user.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}
