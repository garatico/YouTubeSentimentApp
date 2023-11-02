// playlistRequestHandler.js
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const key = process.env.API_KEY;

async function handlePlaylistRequest(req, res) {
  try {
    const playlistId = req.query.playlistId;
    const part = "snippet%2CcontentDetails";
    let nextPageToken = null;
    let page = 1;

    let saveDirectory = path.join("..", "data", "raw", "playlists", playlistId);

    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    do {
      let playlistAPIurl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=100&playlistId=${playlistId}&key=${key}`;

      if (nextPageToken) {
        playlistAPIurl += `&pageToken=${nextPageToken}`;
      }

      // Make a GET request to the YouTube API
      const response = await axios.get(playlistAPIurl);

      if (response.status === 200) {
        const playlistData = response.data;

        if (
          playlistData &&
          playlistData.items &&
          playlistData.items.length > 0
        ) {
          const fetchTimestamp = new Date().toISOString(); // Generate a timestamp
          playlistData.fetchTimestamp = fetchTimestamp; // Add timestamp to the JSON data
          const filePath = path.join(saveDirectory, `${playlistId} PAGE${page}.json`);
          fs.writeFileSync(filePath, JSON.stringify(playlistData));

          // Get the nextPageToken for the next iteration
          nextPageToken = playlistData.nextPageToken;
          page++;
        } else {
          // No more data to fetch, break out of the loop
          break;
        }
      }
    } while (nextPageToken);

    res.status(200).json({
      message: `Comment threads data saved successfully for ${page - 1} pages in ${playlistId}`,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handlePlaylistRequest };
