const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="p-4 border rounded shadow mt-4">
      <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />
      <h2 className="text-xl font-bold">{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;
