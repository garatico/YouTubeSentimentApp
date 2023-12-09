const express = require('express');
const router = express.Router();

const playlistController = require("../controllers/playlistController");
const playlistHandleRoute = playlistController.playlistHandleRoute;

router.get('/', (req, res) => { playlistHandleRoute(req, res); });

module.exports = router;