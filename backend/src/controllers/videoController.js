// videoController.js
require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const key = process.env.API_KEY;
const { video } = require('../../models');

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "YouTubeSentimentData",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const videoHandleRoute = async (req, res) => {
  try {
    const videoExists = await videoExistenceCheck(req);

    if (videoExists) {
      console.log("Video already exists in the database");
      res.status(200).json({ message: "Video already exists in the database", status: "data-exists" });
    } else {
      console.log("Making API call...");
      videoHandleRequest(req, res);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error });
  }
};

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
        
        // Insert the video data into the database
        await videoSaveToDatabase(videoData);

        res.status(200).json({
          message: `Video data saved successfully \n Video data saved to ${filePath} and the database`,
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

const videoSaveToDatabase = async (videoData) => {
  try {
    const videoDataToSave = {
      video_id: videoData.items[0].id,
      publishedat: videoData.items[0].snippet.publishedAt,
      channelid: videoData.items[0].snippet.channelId,
      channeltitle: videoData.items[0].snippet.channelTitle,
      title: videoData.items[0].snippet.title,
      description: videoData.items[0].snippet.description,
      tags: videoData.items[0].snippet.tags,
      duration: videoData.items[0].contentDetails.duration,
      dimension: videoData.items[0].contentDetails.dimension,
      definition: videoData.items[0].contentDetails.definition,
      caption: videoData.items[0].contentDetails.caption,
      licensedcontent: videoData.items[0].contentDetails.licensedContent,
      projection: videoData.items[0].contentDetails.projection,
      viewcount: parseInt(videoData.items[0].statistics.viewCount),
      likecount: parseInt(videoData.items[0].statistics.likeCount),
      favoritecount: parseInt(videoData.items[0].statistics.favoriteCount),
      commentcount: parseInt(videoData.items[0].statistics.commentCount),
      topiccategories: videoData.items[0].topicDetails.topicCategories,
      fetchtimestamp: videoData.fetchTimestamp,
    };

    // Use Sequelize to upsert the video data
    await video.upsert(videoDataToSave);

    console.log("Video data saved to the database");
  } catch (error) {
    console.error("Error saving video data to the database:", error);
  }
};

module.exports = {
    videoHandleRoute
}