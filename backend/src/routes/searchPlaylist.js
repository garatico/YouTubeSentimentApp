const express = require('express');
const router = express.Router();

const playlistController = require("../controllers/playlistController");
const playlistHandleRequest = playlistController.playlistHandleRequest;

router.get('/', (req, res) => { playlistHandleRequest(req, res); });

module.exports = router;