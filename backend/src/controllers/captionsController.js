// captionsController.js
require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "YouTubeSentimentData",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const captionsHandleRoute = async (req, res) => {
  try {
    const captionsExists = await captionsExistenceCheck(req);

    if (captionsExists) {
      console.log("Comments already exists in the database");
      res.status(200).json({ message: "Captions already exists in the database", status: "data-exists" });
    } else {
      console.log("Making API call...");
      captionsHandleRequest(req, res);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error });
  }
};

const captionsExistenceCheck = async (req) => {
  return new Promise((resolve, reject) => {
    const queryText = "SELECT * FROM captions WHERE videoId = $1";
    const values = [req.query.videoId];

    pool.query(queryText, values, (dbError, dbResult) => {
      if (dbError) {
        console.error("Error executing the database query:", dbError);
        reject("Internal server error");
      } else {
        const dbRows = dbResult.rows;

        if (dbRows.length > 0) {
          // Captions exist in the database
          console.log("Captions found in the database:");
          resolve(true); // Resolve with true if the captions exist
        } else {
          // Captions do not exist in the database
          console.log("Captions not found in the database");
          resolve(false); // Resolve with false if the captions don't exist
        }
      }
    });
  });
};

const captionsHandleRequest = async (req, res) => {
  try {
    const videoId = req.query.videoId;
    const part = "snippet";
    
    // Construct the API URL
    const captionsAPIurl = `https://youtube.googleapis.com/youtube/v3/captions?part=${part}&videoId=${videoId}&key=${key}`;

    // Make a GET request to the YouTube API
    const response = await axios.get(captionsAPIurl);

    if (response.status === 200) {
      const captionsData = response.data;

      if (captionsData && captionsData.items && captionsData.items.length > 0) {
        const filePath = path.join("..", "data", "raw", "captions", `${videoId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(captionsData));
        res.status(200).json({ 
          message: `Caption data saved successfully. Caption data saved to ${filePath}`, 
          status: "success" 
        });
      } else {
        res.status(200).json({ 
          message: "No data found for the given video ID", 
          status: "no-data" 
        });
      }
    } else {
      console.error("YouTube API request failed with status:", response.status);
      res.status(response.status).json({ 
        error: "YouTube API request failed", 
        status: "error" 
      });
    }
  } catch (error) {
    console.error("Error fetching caption data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  captionsHandleRoute
};
