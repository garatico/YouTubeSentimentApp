const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const key = process.env.API_KEY;

router.get('/', async (req, res) => {
  try {
    const videoId = req.query.videoId;
    const part = "snippet%2CcontentDetails%2Cstatistics%2CtopicDetails";
    const videoAPIurl = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${videoId}&key=${key}`;

    // Make a GET request to the YouTube API
    const response = await axios.get(videoAPIurl);
    const saveDirectory = path.join('..', 'data', 'raw', 'videos');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    // Check if the response contains the data you need
    const videoData = response.data;

    if (videoData) {
      // Save the JSON data to a file (e.g., video_url.JSON)
      fs.writeFile(path.join(saveDirectory, `${videoId}.json`), JSON.stringify(videoData), (err) => {
        if (err) {
          console.error('Error saving video data:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          // Send a success message
          res.send('Video data saved successfully');
        }
      });
    } else {
      // Send a message indicating the request succeeded but no data was found
      res.send('Video data not found');
    }
  } catch (error) {
    // Handle request failure and send an error message
    // console.error('Error fetching video data:', error);
    res.send('Request to YouTube API failed');
  }
});

module.exports = router;
