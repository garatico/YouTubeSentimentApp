// routes/searchChannel.js
const express = require('express');
const router = express.Router();

const { handleChannelRequest } = require("./utils/channelRequestHandler");

router.get('/', (req, res) => {
  handleChannelRequest(req, res);
});

module.exports = router;

