// routes/searchChannel.js
const express = require('express');
const router = express.Router();

const channelController = require("../controllers/channelController");
const channelHandleRoute = channelController.channelHandleRoute;

router.get('/', (req, res) => { channelHandleRoute(req, res); });

module.exports = router;

