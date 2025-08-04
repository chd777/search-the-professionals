import { useEffect, useState } from 'react';
import './homepage.css';

interface User {
  username: string;
  role: string;
  company: string;
}

const categories = ['All', 'Founder', 'Madam', 'Pale', 'CEO', 'Manager'];
const allowedUsers = ['Samik', 'Puspa', 'Regan', 'Satish','Sabin']; // Only these users will be shown

function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3000/api/users')

      .then((res) => res.json())
      .then((data) => {
        // Only include allowed users
        const filtered = data.filter((user: User) => allowedUsers.includes(user.username));
        setUsers(filtered);
      })
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || user.role === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="homepage">
      <h1>Hey! CHAD</h1>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <p className="results-count">{filteredUsers.length} results found</p>

      <div className="cards">
        {filteredUsers.map((user, index) => (
          <div key={index} className="card">
            <h3>{user.username}</h3>
            <p>{user.role}</p>
            <p>{user.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
