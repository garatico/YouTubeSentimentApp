const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");
const videoHandleRoute = videoController.videoHandleRoute;

const commentThreadController = require("../controllers/commentThreadController");
const commentThreadHandleRoute = commentThreadController.commentThreadHandleRoute;

const captionsController = require("../controllers/commentThreadController");
const captionsHandleRoute = captionsController.captionsHandleRoute;

router.get("/searchVideo", async (req, res) => { videoHandleRoute(req, res); });
router.get('/searchCommentThreads', async (req, res) => { commentThreadHandleRoute(req, res); });
router.get('/searchCaption', async (req, res) => { captionsHandleRoute(req, res); });

module.exports = router;
