import React, { useState, useEffect } from 'react';
import Post from '../components/Post';

export default function TrendingPosts({ token }) {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching trending posts
  useEffect(() => {
    const fetchTrendingPosts = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setTrendingPosts([
            {
              id: 101,
              title: 'Viral Post About React',
              body: 'This post has the most comments because everyone is discussing React best practices!',
              commentCount: 42,
            },
            {
              id: 202,
              title: 'Popular JavaScript Discussion',
              body: 'A heated debate about JavaScript frameworks has made this post very popular.',
              commentCount: 42, // Same count to test multiple trending posts
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Trending Posts</h2>
      {loading ? (
        <p>Loading trending posts...</p>
      ) : (
        <div style={styles.postsList}>
          {trendingPosts.length === 0 ? (
            <p>No trending posts found.</p>
          ) : (
            trendingPosts.map(post => (
              <div key={post.id} style={styles.trendingPost}>
                <Post post={post} token={token} />
                <p style={styles.commentCount}>
                  <strong>{post.commentCount}</strong> comments (Trending!)
                </p>
              </div>
            ))
          )}
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
    gap: '1.5rem',
  },
  trendingPost: {
    position: 'relative',
  },
  commentCount: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    color: '#e91e63',
    fontWeight: 'bold',
    border: '1px solid #e91e63',
  },
};