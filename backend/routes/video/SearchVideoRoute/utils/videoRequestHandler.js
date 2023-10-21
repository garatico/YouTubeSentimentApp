// videoRequestHandler.js
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const key = process.env.API_KEY;

async function handleVideoRequest(req, res) {
  try {
    const videoId = req.query.videoId;
    const part = "snippet%2CcontentDetails%2Cstatistics%2CtopicDetails";
    const videoAPIurl = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${videoId}&key=${key}`;

    // Make a GET request to the YouTube API
    const response = await axios.get(videoAPIurl);
    const saveDirectory = path.join("..", "data", "raw", "videos");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(saveDirectory)) { fs.mkdirSync(saveDirectory, { recursive: true }); }

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      const videoData = response.data;
      if (videoData && videoData.items && videoData.items.length > 0) {
        const filePath = path.join(saveDirectory, `${videoId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(videoData));
        res.status(200).json({ 
          message: `Video data saved successfully \n Video data saved to ${filePath}`, 
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
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleVideoRequest };
