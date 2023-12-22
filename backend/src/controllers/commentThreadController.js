// commentThreadController.js
require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const key = process.env.API_KEY;
const { comment } = require('../../models');

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "YouTubeSentimentData",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const commentThreadHandleRoute = async (req, res) => {
  try {
    const commentThreadExists = await commentThreadExistenceCheck(req);

    if (commentThreadExists) {
      console.log("Comments already exists in the database");
      res.status(200).json({ message: "Comments already exists in the database", status: "data-exists" });
    } else {
      console.log("Making API call...");
      commentThreadHandleRequest(req, res);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error });
  }
};

const commentThreadExistenceCheck = async (req) => {
  return new Promise((resolve, reject) => {
    const queryText = "SELECT * FROM comments WHERE comment_id = $1";
    const values = [req.query.vidoeId];

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

const commentThreadHandleRequest = async (req, res) => {
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

          // 
          await commentThreadSaveToDatabase(videoData);

        } else {
          // No more data to fetch, break out of the loop
          break;
        }
      }
    } while (nextPageToken);

    res.status(200).json({
      message: `Comment threads data saved successfully for ${
        page - 1
      } pages in ${videoId}`,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const commentThreadSaveToDatabase = async (commentThreadData, replyTimestamp = null) => {
  const fetchTimestamp = replyTimestamp !== null ? replyTimestamp : commentThreadData.fetchTimestamp;

  let comments = null;
  if (replyTimestamp !== null) {
    comments = commentThreadData.comments;
    console.log(comments)
  } else {
    comments = commentThreadData.items;
  }

  for (const currentComment of comments) {
    const commentThreadDataToSave = {
      comment_id: currentComment.id,
      channelid: currentComment.snippet.channelId,
      videoid: currentComment.snippet.videoId,
      canreply: currentComment.snippet.canReply,
      totalreplycount: currentComment.snippet.totalReplyCount,

      textdisplay: replyTimestamp !== null ? currentComment.snippet.textDisplay : currentComment.snippet.topLevelComment.snippet.textDisplay,
      textoriginal: replyTimestamp !== null ? currentComment.snippet.textOriginal : currentComment.snippet.topLevelComment.snippet.textOriginal,
      authordisplayname: replyTimestamp !== null ? currentComment.snippet.authorDisplayName : currentComment.snippet.topLevelComment.snippet.authorDisplayName,
      authorchannelid: replyTimestamp !== null ? currentComment.snippet.authorChannelId.value : currentComment.snippet.topLevelComment.snippet.authorChannelId.value,
      canrate: replyTimestamp !== null ? currentComment.snippet.canRate : currentComment.snippet.topLevelComment.snippet.canRate,
      viewerating: replyTimestamp !== null ? currentComment.snippet.viewerRating : currentComment.snippet.topLevelComment.snippet.viewerRating,
      likecount: replyTimestamp !== null ? currentComment.snippet.likeCount : currentComment.snippet.topLevelComment.snippet.likeCount,
      publishedat: replyTimestamp !== null ? currentComment.snippet.publishedAt : currentComment.snippet.topLevelComment.snippet.publishedAt,
      updatedat: replyTimestamp !== null ? currentComment.snippet.updatedAt : currentComment.snippet.topLevelComment.snippet.updatedAt,
      parentid: replyTimestamp !== null ? currentComment.snippet.parentId : currentComment.snippet.topLevelComment.snippet.parentId,

      fetchtimestamp: fetchTimestamp
    };
    if (currentComment.replies) {
      await commentThreadSaveToDatabase(currentComment.replies, commentThreadDataToSave.fetchtimestamp);
    }
    // Push the asynchronous operation to an array
    // and execute them using Promise.all outside the loop
    await comment.upsert(commentThreadDataToSave);
  }
}

module.exports = {
  commentThreadHandleRoute
};
