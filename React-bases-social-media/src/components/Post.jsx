import React, { useState, useEffect } from 'react';

export default function Post({ post, token }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostComments = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setComments(Array(post.id % 5 + 1).fill().map((_, i) => ({
            id: `${post.id}-${i}`,
            text: `Comment ${i+1} on post ${post.id}`,
          })));
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchPostComments();
  }, [post.id, token]);

  return (
    <div style={styles.post}>
      <h3 style={styles.postTitle}>{post.title}</h3>
      <p style={styles.postBody}>{post.body}</p>
      <div style={styles.commentsSection}>
        <h4 style={styles.commentsTitle}>Comments ({comments.length})</h4>
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <ul style={styles.commentsList}>
            {comments.map(comment => (
              <li key={comment.id} style={styles.comment}>
                {comment.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  post: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
  },
  postTitle: {
    marginTop: 0,
    color: '#333',
  },
  postBody: {
    color: '#666',
  },
  commentsSection: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
  },
  commentsTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1rem',
    color: '#444',
  },
  commentsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  comment: {
    padding: '0.5rem',
    backgroundColor: '#fff',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #eee',
  },
};