const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const currentDirectory = process.cwd();
  const parentDirectory = path.dirname(currentDirectory);

  const videosDirectory = path.join(parentDirectory, 'data', 'raw', 'videos');
  const captionsListDirectory = path.join(parentDirectory, 'data', 'raw', 'captions-list');
  const commentThreadsDirectory = path.join(parentDirectory, 'data', 'raw', 'comment-threads');

  // Create an object to store the data
  const data = {
    videoFiles: [],
    captionListFiles: [],
    commentThreads: [],
  };

  // Read the contents of the video directory
  fs.readdir(videosDirectory, (videoErr, videoFiles) => {
    if (videoErr) {
      console.error('Error reading video directory:', videoErr);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      data.videoFiles = videoFiles;
      // Read the caption directory
      fs.readdir(captionsListDirectory, (captionErr, captionsListFiles) => {
        if (captionErr) {
          console.error('Error reading caption directory:', captionErr);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          data.captionListFiles = captionsListFiles;
          // Read the comment threads directory
          fs.readdir(commentThreadsDirectory, (commentThreadsErr, commentThreadsFiles) => {
            if (commentThreadsErr) {
              console.error('Error reading comment-threads directory:', commentThreadsErr);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              data.commentThreads = commentThreadsFiles;
              // Send all the data as a JSON response
              res.json(data);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
