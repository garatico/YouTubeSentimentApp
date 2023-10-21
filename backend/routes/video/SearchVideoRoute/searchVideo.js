const express = require("express");
const router = express.Router();

const { handleVideoRequest } = require("./utils/videoRequestHandler");

router.get("/", async (req, res) => {
  handleVideoRequest(req, res);
});

module.exports = router;
