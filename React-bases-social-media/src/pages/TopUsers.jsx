import React, { useState, useEffect } from 'react';

export default function TopUsers({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setUsers([
            { id: 1, name: 'User A', postCount: 15, commentCount: 120 },
            { id: 2, name: 'User B', postCount: 12, commentCount: 95 },
            { id: 3, name: 'User C', postCount: 10, commentCount: 87 },
            { id: 4, name: 'User D', postCount: 8, commentCount: 76 },
            { id: 5, name: 'User E', postCount: 7, commentCount: 65 },
          ]);
          setLoading(false);
        }, 700);
      } catch (error) {
        console.error('Error fetching top users:', error);
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Top Users by Comments</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div style={styles.usersList}>
          {users.map(user => (
            <div key={user.id} style={styles.userCard}>
              <h3 style={styles.userName}>{user.name}</h3>
              <div style={styles.userStats}>
                <p>Posts: {user.postCount}</p>
                <p>Comments: {user.commentCount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    marginBottom: '1.5rem',
  },
  usersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  userCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
  },
  userName: {
    margin: '0 0 0.5rem 0',
    color: '#333',
  },
  userStats: {
    display: 'flex',
    gap: '1rem',
    color: '#666',
  },
};