// videoRequestHandler.js
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const key = process.env.API_KEY;

async function handleCommentThreadsRequest(req, res) {
  try {
    const videoId = req.query.videoId;
    const part = "snippet%2Creplies";
    let nextPageToken = null;
    let page = 1;

    let saveDirectory = path.join("..", "data", "raw", "comment-threads", videoId);

    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    do {
      // Construct the API URL with the current page and nextPageToken
      let commentThreadsAPIurl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=${part}&maxResults=100&videoId=${videoId}&key=${key}`;

      if (nextPageToken) {
        commentThreadsAPIurl += `&pageToken=${nextPageToken}`;
      }

      // Make a GET request to the YouTube API
      const response = await axios.get(commentThreadsAPIurl);

      if (response.status === 200) {
        const videoData = response.data;

        if (videoData && videoData.items && videoData.items.length > 0) {
          const fetchTimestamp = new Date().toISOString(); // Generate a timestamp
          videoData.fetchTimestamp = fetchTimestamp; // Add timestamp to the JSON data
          const filePath = path.join(saveDirectory, `${videoId} PAGE${page}.json`);
          fs.writeFileSync(filePath, JSON.stringify(videoData));

          // Get the nextPageToken for the next iteration
          nextPageToken = videoData.nextPageToken;
          page++;
        } else {
          // No more data to fetch, break out of the loop
          break;
        }
      }
    } while (nextPageToken);

    res.status(200).json({ 
      message: `Comment threads data saved successfully for ${page - 1} pages in ${videoId}`, 
      status: "success" 
    });
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleCommentThreadsRequest };