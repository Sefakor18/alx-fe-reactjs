import axios from "axios";

const BASE_URL = "https://api.github.com/search/users?q";

// Fetch single user (by username)
export const fetchUserData = async (username) => {
  if (!username) return null;
  try {
    const res = await axios.get(`${BASE_URL}/users/${username}`);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Advanced search (by username, location, minRepos)
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    let query = "";
    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos}`;

    const res = await axios.get(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}`
    );
    return res.data.items || [];
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};
