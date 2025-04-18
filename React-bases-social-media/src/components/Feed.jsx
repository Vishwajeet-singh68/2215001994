import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function Feed({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setPosts(Array(10).fill().map((_, i) => ({
            id: i + 1,
            title: `Post ${i + 1}`,
            body: `This is the content of post ${i + 1}. It contains some sample text for demonstration purposes.`,
            timestamp: new Date(Date.now() - i * 60000).toISOString(),
          })));
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPosts(prev => [
        {
          id: prev.length + 1,
          title: `New Post ${prev.length + 1}`,
          body: `This is a newly added post at ${new Date().toLocaleTimeString()}`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Recent Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div style={styles.postsList}>
          {posts.map(post => (
            <Post key={post.id} post={post} token={token} />
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
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
};