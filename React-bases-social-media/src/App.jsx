import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import Feed from './components/Feed';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';

function App() {
  const [page, setPage] = useState('feed');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const credentials = {
    email: "vishwajeet.singh_cs22@gla.ac.in",
    name: "vishwajeet singh",
    rollNo: "2215001994",
    accessCode: "CNneGT",
    clientID: "c72113e5-901f-4c9d-9d36-3e3c9be91bc3",
    clientSecret: "EaQwnVYseApeuyCG"
  };

  useEffect(() => {
    const fetchTokenAndUsers = async () => {
      try {
        const tokenResponse = await axios.post(
          'http://20.244.56.144/evaluation-service/auth',
          credentials,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!tokenResponse.data.access_token) {
          throw new Error('No access token received');
        }

        const accessToken = tokenResponse.data.access_token;
        setToken(accessToken);
        console.log('Token received:', accessToken);

        const usersResponse = await axios.get(
          'http://20.244.56.144/evaluation-service/users',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setUserData(usersResponse.data);
        console.log('User data received:', usersResponse.data);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching token or user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndUsers();
  }, []);

  const renderPage = () => {
    const props = { token, userData };
    switch (page) {
      case 'feed':
        return <Feed {...props} />;
      case 'top-users':
        return <TopUsers {...props} />;
      case 'trending-posts':
        return <TrendingPosts {...props} />;
      default:
        return <Feed {...props} />;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="app">
      <Navbar setPage={setPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
