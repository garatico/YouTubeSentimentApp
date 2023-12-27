// channelRequestHandler.js
require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const key = process.env.API_KEY;
const { channel } = require('../../models');

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "YouTubeSentimentData",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const buildChannelAPIurl = (inputType, inputValue, part, key) => {
  if (inputType == "id") {
    const id = inputValue;
    const channelAPIurl = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`;
    return channelAPIurl;
  } else if (inputType == "name") {
    const userName = inputValue;
    const channelAPIurl = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&forUsername=${userName}&key=${key}`;
    return channelAPIurl;
  }
}

const channelHandleRoute = async (req, res) => {
  channelHandleRequest(req, res);
}

const channelHandleRequest = async (req, res) => {
  try {
    const inputType = req.query.channelInputType;
    const inputValue = req.query.channelInputValue;
    const part = "snippet%2CcontentDetails%2Cstatistics";
    const channelAPIurl = buildChannelAPIurl(inputType, inputValue, part, key);

    // Make a GET request to the YouTube API
    const response = await axios.get(channelAPIurl);
    const saveDirectory = path.join("..", "data", "raw", "channels");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      const channelData = response.data;
      if (channelData && channelData.items && channelData.items.length > 0) {
        const fetchTimestamp = new Date().toISOString(); // Generate a timestamp

        // Find the channelId within the first item in items
        const channelId = channelData.items[0].id; // Replace "id" with the actual key containing the channelId

        channelData.fetchTimestamp = fetchTimestamp; // Add timestamp to the JSON data
        const filePath = path.join(saveDirectory, `${channelId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(channelData));

        // Insert the channel data into the database
        await channelSaveToDatabase(channelData);

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
}

const channelSaveToDatabase = async (channelData) => {
  try {
    const channelDataToSave = {
      channel_id: channelData.items[0].id,
      title: channelData.items[0].snippet.title,
      description: channelData.items[0].snippet.description,
      customurl: channelData.items[0].snippet.customUrl,
      publishedat: channelData.items[0].snippet.publishedAt,
      country: channelData.items[0].snippet.country,

      likesplaylist: channelData.items[0].contentDetails.relatedPlaylists.likes, 
      uploadsplaylist: channelData.items[0].contentDetails.relatedPlaylists.uploads, 

      viewcount: channelData.items[0].statistics.viewCount,
      subscribercount: channelData.items[0].statistics.subscriberCount,
      hiddensubscribercount: channelData.items[0].statistics.hiddenSubscriberCount,
      videocount: channelData.items[0].statistics.videoCount,
      fetchtimestamp: channelData.fetchTimestamp
    };
    // Use Sequelize to upsert the video data
    await channel.upsert(channelDataToSave);
    console.log("Video data saved to the database");
  } catch (error) {
    console.error("Error saving video data to the database:", error);
  }
};

module.exports = { channelHandleRoute };

// FROM THE UPLOADS PLAYLIST
// "uploads": "UULLw7jmFsvfIVaUFsLs8mlQ"
// GET https://youtube.googleapis.com/youtube/v3/playlistItems?maxResults=999&playlistId=UULLw7jmFsvfIVaUFsLs8mlQ&key=[YOUR_API_KEY] HTTP/1.1

/*
    let id = "";
    let channelAPIurl = "";

    if (inputType == "id") {
      id = inputValue;
      channelAPIurl = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`;
    } else if (inputType == "name") {
      userName = inputValue;
      channelAPIurl = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&forUsername=${userName}&key=${key}`;
    }
    */
