// viewVideoData.js
require("dotenv").config(); // Load environment variables from .env
const express = require('express');
const router = express.Router();
const { spawn } = require('child_process'); // Import the child_process module
const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();
const parentDirectory = path.dirname(currentDirectory);

const dbVideoController = require("../controllers/dbVideoController");
const dbVideoHandleRoute = dbVideoController.dbVideoHandleRoute;

// READ VIDEO MANIFEST ENDPOINT
router.get('/readVideoManifest', (req, res) => {
  const videosDirectory = path.join(parentDirectory, 'data', 'raw');
  const manifestFilePath = path.join(videosDirectory, 'raw_videos_manifest.json');

  // Check if the manifest file exists
  if (fs.existsSync(manifestFilePath)) {
    // Read the manifest file
    fs.readFile(manifestFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading manifest file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Send the contents of the manifest file as a response
        res.send(data);
      }
    });
  } else {
    res.status(404).json({ error: 'Manifest file not found' });
  }
});

// UPDATE VIDEO MANIFEST
router.post('/updateVideoManifest', (req, res) => {
  const cwd = process.cwd(); // Get the current working directory
  const scriptPath = path.join(cwd, '..', 'analyses', 'src', 'videos_manifest.py'); // Construct the path to the Python script

  // Run the Python script using spawn
  const pythonProcess = spawn('python', [scriptPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Script output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Script error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.status(200).send('Script executed successfully');
    } else {
      console.error(`Script execution failed with code ${code}`);
      res.status(500).send('Script execution failed');
    }
  });
});

// READ COMMENTS MANIFEST ENDPOINT
router.get('/readCommentsManifest', (req, res) => {
  const videosDirectory = path.join(parentDirectory, 'data', 'raw');
  const manifestFilePath = path.join(videosDirectory, 'raw_comments_manifest.json');

  // Check if the manifest file exists
  if (fs.existsSync(manifestFilePath)) {
    // Read the manifest file
    fs.readFile(manifestFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading manifest file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Send the contents of the manifest file as a response
        res.send(data);
      }
    });
  } else {
    res.status(404).json({ error: 'Manifest file not found' });
  }
});

// ================================================

// READ VIDEO SQL DB ENDPOINT
router.get('/readVideoDB', (req, res) => { dbVideoHandleRoute(req, res); });


module.exports = router;