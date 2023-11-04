// videoThreadController.js
require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "YouTubeSentimentData",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const videoExistenceCheck = async (req) => {
  return new Promise((resolve, reject) => {
    const queryText = "SELECT * FROM videos WHERE video_id = $1";
    const values = [req.query.videoId];

    pool.query(queryText, values, (dbError, dbResult) => {
      if (dbError) {
        console.error("Error executing the database query:", dbError);
        reject("Internal server error");
      } else {
        const dbRows = dbResult.rows;

        if (dbRows.length > 0) {
          // Video exists in the database
          console.log("Video found in the database:");
          resolve(true); // Resolve with true if the video exists
        } else {
          // Video does not exist in the database
          console.log("Video not found in the database");
          resolve(false); // Resolve with false if the video doesn't exist
        }
      }
    });
  });
};

const videoHandleRequest = async (req, res) => {
  try {
    const videoId = req.query.videoId;
    const part = "snippet%2CcontentDetails%2Cstatistics%2CtopicDetails";
    const videoAPIurl = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${videoId}&key=${key}`;

    // Make a GET request to the YouTube API
    const response = await axios.get(videoAPIurl);
    const saveDirectory = path.join("..", "data", "raw", "videos");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      const videoData = response.data;
      if (videoData && videoData.items && videoData.items.length > 0) {
        const fetchTimestamp = new Date().toISOString(); // Generate a timestamp
        videoData.fetchTimestamp = fetchTimestamp; // Add timestamp to the JSON data
        const filePath = path.join(saveDirectory, `${videoId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(videoData));
        res.status(200).json({
          message: `Video data saved successfully \n Video data saved to ${filePath}`,
          status: "success",
        });
      } else {
        res.status(200).json({
          message: "No data found for the given video ID",
          status: "no-data",
        });
      }
    } else {
      console.error("YouTube API request failed with status:", response.status);
      res.status(response.status).json({
        error: "YouTube API request failed",
        status: "error",
      });
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
    videoExistenceCheck,
    videoHandleRequest
}