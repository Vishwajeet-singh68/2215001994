const express = require("express");
const app = express();
const cors = require("cors");
const fetch = import("node-fetch");

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const API_CONFIG = {
  baseUrl: "http://20.244.56.144/evaluation-service",
  credentials: {
    email: "vishwajeet.singh_cs22@gla.ac.in",
    name: "vishwajeet singh",
    rollNo: "2215001994",
    accessCode: "CNneGT",
    clientID: "c72113e5-901f-4c9d-9d36-3e3c9be91bc3",
    clientSecret: "EaQwnVYseApeuyCG"
  }
};

// Main endpoint that handles both token and user fetching
app.get("/fetch-data", async (req, res) => {
  try {
    console.log("Starting token fetch...");
    
    // 1. Fetch the token
    const tokenResponse = await fetch(`${API_CONFIG.baseUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(API_CONFIG.credentials)
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token fetch failed:", errorText);
      return res.status(tokenResponse.status).json({
        success: false,
        error: "Token fetch failed",
        details: errorText
      });
    }

    const { access_token } = await tokenResponse.json();
    console.log("Token fetched successfully");

    // 2. Use the token to fetch users
    console.log("Starting user data fetch...");
    const userResponse = await fetch(`${API_CONFIG.baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("User fetch failed:", errorText);
      return res.status(userResponse.status).json({
        success: false,
        error: "User fetch failed",
        details: errorText
      });
    }

    const userData = await userResponse.json();
    console.log("User data fetched successfully");

    // 3. Return the combined response
    res.json({
      success: true,
      token: access_token,
      users: userData
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});