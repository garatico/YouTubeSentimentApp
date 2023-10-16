const express = require('express');
const router = express.Router();
const fs = require('fs'); // Import the 'fs' module
const path = require('path'); // Import the 'path' module

router.get('/', (req, res) => {
  const currentDirectory = process.cwd(); // Get the current working directory

  // Get the parent directory path by using path.dirname
  const parentDirectory = path.dirname(currentDirectory);

  // Define the target directory path
  const targetDirectory = path.join(parentDirectory, 'data', 'raw', 'videos');

  // Read the contents of the target directory
  fs.readdir(targetDirectory, (err, files) => {
    if (err) {
      console.error('Error reading target directory:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Send the list of files and directories as a JSON response
      res.json({ files });
    }
  });
});

module.exports = router;
