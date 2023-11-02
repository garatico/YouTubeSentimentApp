const express = require('express');
const router = express.Router();

const { handlePlaylistRequest } = require("./utils/playlistRequestHandler");

router.get('/', (req, res) => {
  handlePlaylistRequest(req, res);
});

module.exports = router;